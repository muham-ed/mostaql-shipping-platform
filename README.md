# Mostaql Shipping Platform | منصة مستقل لشحن وتوصيل الطرود

Smart crowdsourced parcel shipping & delivery platform connecting shipping companies and independent drivers with AI route optimization, geofenced proof-of-delivery (ePOD), and automated cash collection (COD) settlements.

---

##  Key Subsystems (عناصر المنظومة)

1. **Driver Mobile App (`apps/driver-app`)**: Flutter app for drivers featuring optimized route delivery, Haversine Geofence ePOD validation, and offline sync queue.
2. **Supervisor Mobile App (`apps/supervisor-app`)**: Flutter app for hub supervisors to scan incoming parcels, assign batches to drivers, and process cash settlements.
3. **AI Routing Engine (`apps/routing-engine`)**: Python / FastAPI microservice powered by Google OR-Tools VRP Solver and Spatial Clustering algorithms.
4. **Core API Gateway (`apps/api`)**: NestJS / TypeScript backend with WebSocket realtime live map tracking gateway (`TrackingGateway`).
5. **Admin Control Panel (`apps/admin-panel`)**: React / TypeScript dashboard for live operation monitoring, driver KPI analytics, and dispute resolution.
6. **Company Partner Portal (`apps/company-portal`)**: React / TypeScript portal for shipping companies to create orders, import bulk manifests, and track shipments.

---

##  Tech Stack (التقنيات المستخدمة)

- **Mobile:** Flutter (Dart)
- **Web Frontend:** React, TypeScript, Vite
- **Backend API:** NestJS, TypeScript, WebSockets (Socket.io)
- **AI / Routing:** Python 3.12, FastAPI, OR-Tools, Scikit-Learn
- **Databases & Cache:** PostgreSQL 16 + PostGIS, Redis Cluster
- **Storage:** MinIO / AWS S3 (ePOD Photo & Signature uploads)
- **DevOps:** Docker Compose, Kubernetes Infrastructure-as-Code

---

##  Quick Start (تشغيل البيئة محلياً)

```bash
# Clone the repository
git clone https://github.com/muham-ed/mostaql-shipping-platform.git
cd mostaql-shipping-platform

# Spin up all services with Docker
docker-compose -f flutter_application_1/docker-compose.yml up -d
```

---

## 📄 License
All rights reserved © 2026 Mostaql Shipping Platform.
