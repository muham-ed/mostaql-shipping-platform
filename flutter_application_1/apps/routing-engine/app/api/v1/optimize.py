from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.core.vrp_solver import VRPSolver

router = APIRouter()

class Location(BaseModel):
    lat: float
    lng: float

class ShipmentStop(BaseModel):
    shipment_id: str
    lat: float
    lng: float

class OptimizeRequest(BaseModel):
    depot: Location
    stops: List[ShipmentStop]
    max_vehicle_capacity: Optional[int] = 50

@router.post('/optimize')
def optimize_route(payload: OptimizeRequest):
    if not payload.stops:
        raise HTTPException(status_code=400, detail="Stops list cannot be empty.")

    stops_dict = [stop.model_dump() for stop in payload.stops]
    depot_dict = payload.depot.model_dump()

    result = VRPSolver.solve_route_nearest_neighbor(
        depot=depot_dict,
        stops=stops_dict,
        max_capacity=payload.max_vehicle_capacity
    )

    return {
        "status": "success",
        "data": result
    }
