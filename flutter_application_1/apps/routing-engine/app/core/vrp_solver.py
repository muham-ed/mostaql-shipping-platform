import math
from typing import List, Dict, Any

class VRPSolver:
    """
    Vehicle Routing Problem (VRP) Solver with Capacity & Distance Constraints.
    Calculates optimal routes for delivery drivers to minimize total travel distance
    and equalize workload across vehicles.
    """

    EARTH_RADIUS_KM = 6371.0

    @staticmethod
    def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """Calculates Haversine distance in meters between two lat/lon points."""
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = (math.sin(dlat / 2) ** 2 +
             math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
             math.sin(dlon / 2) ** 2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return VRPSolver.EARTH_RADIUS_KM * c * 1000.0  # Returns meters

    @classmethod
    def compute_distance_matrix(cls, locations: List[Dict[str, float]]) -> List[List[int]]:
        """
        Builds NxN distance matrix in integer meters for OR-Tools / routing heuristics.
        """
        size = len(locations)
        matrix = [[0] * size for _ in range(size)]
        for i in range(size):
            for j in range(size):
                if i != j:
                    dist = cls.haversine_distance(
                        locations[i]['lat'], locations[i]['lng'],
                        locations[j]['lat'], locations[j]['lng']
                    )
                    matrix[i][j] = int(round(dist))
        return matrix

    @classmethod
    def solve_route_nearest_neighbor(
        cls,
        depot: Dict[str, float],
        stops: List[Dict[str, Any]],
        max_capacity: int = 50
    ) -> Dict[str, Any]:
        """
        Solves route optimization using Nearest-Neighbor heuristic with capacity limits.
        """
        if not stops:
            return {"route": [], "total_distance_meters": 0, "stop_count": 0}

        unvisited = list(range(len(stops)))
        current_loc = depot
        ordered_stops = []
        total_distance = 0.0

        while unvisited and len(ordered_stops) < max_capacity:
            nearest_idx = -1
            min_dist = float('inf')

            for idx in unvisited:
                stop = stops[idx]
                dist = cls.haversine_distance(
                    current_loc['lat'], current_loc['lng'],
                    stop['lat'], stop['lng']
                )
                if dist < min_dist:
                    min_dist = dist
                    nearest_idx = idx

            if nearest_idx != -1:
                unvisited.remove(nearest_idx)
                chosen_stop = stops[nearest_idx]
                total_distance += min_dist
                ordered_stops.append({
                    "sequence": len(ordered_stops) + 1,
                    "shipment_id": chosen_stop.get('shipment_id'),
                    "lat": chosen_stop['lat'],
                    "lng": chosen_stop['lng'],
                    "distance_from_prev_meters": round(min_dist, 2)
                })
                current_loc = chosen_stop

        return {
            "route": ordered_stops,
            "total_distance_meters": round(total_distance, 2),
            "stop_count": len(ordered_stops),
            "unassigned_count": len(unvisited)
        }
