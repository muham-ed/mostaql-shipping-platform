# Shipment Lifecycle

States: pending -> assigned -> picked_up -> in_transit -> delivered
Failure path: in_transit -> failed -> assigned

Single source of truth: apps/api/src/modules/shipments/shipment-state-machine.ts