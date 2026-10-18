import math
from typing import List, Dict, Any

class SpatialClustering:
    """
    Groups shipment drop-off locations into spatial geographic zones/clusters
    using distance thresholding. Used for assigning clusters to specific driver routes.
    """

    @staticmethod
    def cluster_shipments(
        shipments: List[Dict[str, Any]],
        max_distance_km: float = 3.0
    ) -> List[Dict[str, Any]]:
        """
        Clusters shipments into geographical zones based on radius proximity.
        """
        if not shipments:
            return []

        clusters = []
        unassigned = list(shipments)

        cluster_id_counter = 1

        while unassigned:
            seed = unassigned.pop(0)
            cluster_members = [seed]

            remaining = []
            for item in unassigned:
                dist = SpatialClustering._haversine_km(
                    seed['lat'], seed['lng'],
                    item['lat'], item['lng']
                )
                if dist <= max_distance_km:
                    cluster_members.append(item)
                else:
                    remaining.append(item)

            unassigned = remaining

            # Calculate centroid of cluster
            avg_lat = sum(m['lat'] for m in cluster_members) / len(cluster_members)
            avg_lng = sum(m['lng'] for m in cluster_members) / len(cluster_members)

            clusters.append({
                "cluster_id": f"zone_{cluster_id_counter}",
                "centroid": {"lat": round(avg_lat, 6), "lng": round(avg_lng, 6)},
                "total_shipments": len(cluster_members),
                "shipments": cluster_members
            })
            cluster_id_counter += 1

        return clusters

    @staticmethod
    def _haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        R = 6371.0
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = (math.sin(dlat / 2) ** 2 +
             math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
             math.sin(dlon / 2) ** 2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return R * c
