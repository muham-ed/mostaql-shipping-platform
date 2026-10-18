import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { DriversService, DriverProfile } from './drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  public register(
    @Body()
    body: {
      fullName: string;
      phoneNumber: string;
      nationalId: string;
      vehiclePlate: string;
    },
  ): DriverProfile {
    return this.driversService.registerDriver(body);
  }

  @Get()
  public findAll(): DriverProfile[] {
    return this.driversService.getAllDrivers();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): DriverProfile {
    return this.driversService.getDriverById(id);
  }

  @Patch(':id/location')
  public updateLocation(
    @Param('id') id: string,
    @Body('lat') lat: number,
    @Body('lng') lng: number,
  ): DriverProfile {
    return this.driversService.updateLocation(id, lat, lng);
  }

  @Patch(':id/status')
  public toggleOnline(
    @Param('id') id: string,
    @Body('isOnline') isOnline: boolean,
  ): DriverProfile {
    return this.driversService.setOnlineStatus(id, isOnline);
  }
}
