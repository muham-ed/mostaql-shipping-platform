import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class GeofenceValidatorService {
  private readonly EARTH_RADIUS_METERS = 6371000;
  private readonly DEFAULT_MAX_RADIUS_METERS = 150;

  /**
   * Calculates distance between driver and destination coordinates in meters using Haversine formula.
   */
  public calculateDistanceMeters(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return this.EARTH_RADIUS_METERS * c;
  }

  /**
   * Validates if driver is within allowed radius for electronic proof of delivery (ePOD).
   * Throws BadRequestException if driver is outside geofence.
   */
  public validateDeliveryLocation(
    driverLat: number,
    driverLng: number,
    destLat: number,
    destLng: number,
    allowedRadiusMeters: number = this.DEFAULT_MAX_RADIUS_METERS,
  ): { isWithinGeofence: boolean; distanceMeters: number } {
    const distanceMeters = this.calculateDistanceMeters(
      driverLat,
      driverLng,
      destLat,
      destLng,
    );

    if (distanceMeters > allowedRadiusMeters) {
      throw new BadRequestException(
        `Delivery rejected: Driver is ${Math.round(distanceMeters)}m away from destination (max allowed: ${allowedRadiusMeters}m).`,
      );
    }

    return {
      isWithinGeofence: true,
      distanceMeters: Math.round(distanceMeters * 100) / 100,
    };
  }

  private toRadians(degree: number): number {
    return (degree * Math.PI) / 180;
  }
}
