from fastapi import APIRouter
from pydantic import BaseModel
from app.core.eta_predictor import ETAPredictor

router = APIRouter()

class ETARequest(BaseModel):
    distance_meters: float
    remaining_stops: int = 1

@router.post('/eta')
def predict_eta(payload: ETARequest):
    result = ETAPredictor.calculate_eta_minutes(
        distance_meters=payload.distance_meters,
        remaining_stops_count=payload.remaining_stops
    )
    return {
        "status": "success",
        "data": result
    }
