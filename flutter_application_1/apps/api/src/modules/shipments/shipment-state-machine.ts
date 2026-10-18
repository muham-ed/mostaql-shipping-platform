// Shipment lifecycle state machine - single source of truth
export const SHIPMENT_STATES = [
  'pending', 'assigned', 'picked_up', 'in_transit',
  'delivered', 'failed', 'cancelled'
] as const;

export type ShipmentState = (typeof SHIPMENT_STATES)[number];

export const TRANSITIONS: Record<ShipmentState, ShipmentState[]> = {
  pending:    ['assigned', 'cancelled'],
  assigned:   ['picked_up', 'cancelled'],
  picked_up:  ['in_transit', 'failed'],
  in_transit: ['delivered', 'failed'],
  delivered:  [],
  failed:     ['assigned'],
  cancelled:  [],
};