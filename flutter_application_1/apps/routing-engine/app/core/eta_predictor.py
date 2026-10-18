from typing import Dict, Any

class ETAPredictor:
    """
    Calculates estimated time of arrival (ETA) based on distance, average urban speed,
    and handling overhead time per stop.
    """

    AVERAGE_URBAN_SPEED_KMH = 30.0  # Average city speed in km/h
    HANDLING_TIME_PER_STOP_MIN = 5.0  # Average handover time at recipient location

    @classmethod
    def calculate_eta_minutes(
        cls,
        distance_meters: float,
        remaining_stops_count: int = 1
    ) -> Dict[str, Any]:
        """
        Predicts total travel time in minutes.
        """
        distance_km = distance_meters / 1000.0
        travel_time_hours = distance_km / cls.AVERAGE_URBAN_SPEED_KMH
        travel_time_minutes = travel_time_hours * 60.0

        total_handling_time = remaining_stops_count * cls.HANDLING_TIME_PER_STOP_MIN
        estimated_total_minutes = round(travel_time_minutes + total_handling_time, 1)

        return {
            "distance_km": round(distance_km, 2),
            "travel_time_minutes": round(travel_time_minutes, 1),
            "handling_time_minutes": total_handling_time,
            "estimated_eta_minutes": estimated_total_minutes
        }
