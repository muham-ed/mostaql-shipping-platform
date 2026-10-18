from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.core.clustering import SpatialClustering

router = APIRouter()

class ShipmentPoint(BaseModel):
    shipment_id: str
    lat: float
    lng: float

class ClusterRequest(BaseModel):
    shipments: List[ShipmentPoint]
    max_radius_km: float = 3.0

@router.post('/cluster')
def cluster_shipments(payload: ClusterRequest):
    if not payload.shipments:
        raise HTTPException(status_code=400, detail="Shipment list cannot be empty.")

    shipments_dict = [s.model_dump() for s in payload.shipments]
    clusters = SpatialClustering.cluster_shipments(
        shipments=shipments_dict,
        max_distance_km=payload.max_radius_km
    )

    return {
        "status": "success",
        "total_clusters": len(clusters),
        "clusters": clusters
    }
