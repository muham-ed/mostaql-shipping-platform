from fastapi import FastAPI
from app.api.v1.router import api_router

app = FastAPI(title='Mostaql Routing Engine', version='0.1.0')
app.include_router(api_router, prefix='/v1')

@app.get('/health')
def health():
    return {'status': 'ok'}