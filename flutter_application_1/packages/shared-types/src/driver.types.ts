import { DriverStatus } from './enums';
import { LocationCoordinates } from './shipment.types';

export interface IDriver {
  id: string;
  userId: string;
  fullName: string;
  phoneNumber: string;
  nationalId: string;
  vehiclePlateNumber: string;
  vehicleType: string;
  status: DriverStatus;
  currentLocation?: LocationCoordinates;
  walletUnsettledCodBalance: number;
  maxCodWalletLimit: number;
  ratingAverage: number;
  totalDeliveriesCompleted: number;
  createdAt: Date;
}
