export enum UserRole {
  ADMIN = 'admin',
  SUPERVISOR = 'supervisor',
  DRIVER = 'driver',
  COMPANY_ADMIN = 'company_admin',
}

export enum ShipmentStatus {
  PENDING = 'pending',
  ASSIGNED = 'assigned',
  PICKED_UP = 'picked_up',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum PaymentStatus {
  UNPAID = 'unpaid',
  COLLECTED = 'collected',
  SETTLED = 'settled',
  REFUNDED = 'refunded',
}

export enum DriverStatus {
  OFFLINE = 'offline',
  ONLINE = 'online',
  ON_DELIVERY = 'on_delivery',
  SUSPENDED = 'suspended',
}

export enum DisputeStatus {
  OPEN = 'open',
  UNDER_REVIEW = 'under_review',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}
