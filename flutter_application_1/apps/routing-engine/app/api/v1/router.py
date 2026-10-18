from fastapi import APIRouter
from app.api.v1.optimize import router as optimize_router
from app.api.v1.cluster import router as cluster_router
from app.api.v1.eta import router as eta_router

api_router = APIRouter()
api_router.include_router(optimize_router, tags=["Route Optimization"])
api_router.include_router(cluster_router, tags=["Geographic Clustering"])
api_router.include_router(eta_router, tags=["ETA Prediction"])
