import { ShipmentStatus, PaymentStatus } from './enums';

export interface LocationCoordinates {
  lat: number;
  lng: number;
  addressText?: string;
  cityName?: string;
}

export interface IShipment {
  id: string;
  trackingNumber: string;
  companyId: string;
  driverId?: string;
  routeId?: string;
  senderName: string;
  senderPhone: string;
  senderLocation: LocationCoordinates;
  recipientName: string;
  recipientPhone: string;
  recipientLocation: LocationCoordinates;
  codAmount: number;
  paymentStatus: PaymentStatus;
  status: ShipmentStatus;
  packageWeightKg?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
