import { Injectable, NotFoundException } from '@nestjs/common';

export interface DriverProfile {
  id: string;
  fullName: string;
  phoneNumber: string;
  nationalId: string;
  vehiclePlate: string;
  isOnline: boolean;
  currentLat?: number;
  currentLng?: number;
  rating: number;
  unsettledCodBalance: number;
  createdAt: Date;
}

@Injectable()
export class DriversService {
  private readonly drivers: Map<string, DriverProfile> = new Map();

  public registerDriver(data: {
    fullName: string;
    phoneNumber: string;
    nationalId: string;
    vehiclePlate: string;
  }): DriverProfile {
    const id = `drv_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const driver: DriverProfile = {
      id,
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      nationalId: data.nationalId,
      vehiclePlate: data.vehiclePlate,
      isOnline: false,
      rating: 5.0,
      unsettledCodBalance: 0,
      createdAt: new Date(),
    };
    this.drivers.set(id, driver);
    return driver;
  }

  public getDriverById(id: string): DriverProfile {
    const driver = this.drivers.get(id);
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found.`);
    }
    return driver;
  }

  public updateLocation(id: string, lat: number, lng: number): DriverProfile {
    const driver = this.getDriverById(id);
    driver.currentLat = lat;
    driver.currentLng = lng;
    return driver;
  }

  public setOnlineStatus(id: string, isOnline: boolean): DriverProfile {
    const driver = this.getDriverById(id);
    driver.isOnline = isOnline;
    return driver;
  }

  public getAllDrivers(): DriverProfile[] {
    return Array.from(this.drivers.values());
  }
}
