import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ShipmentsService, CreateShipmentDto, ShipmentRecord } from './shipments.service';
import { ShipmentState } from './shipment-state-machine';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post()
  public create(@Body() dto: CreateShipmentDto): ShipmentRecord {
    return this.shipmentsService.createShipment(dto);
  }

  @Get()
  public findAll(): ShipmentRecord[] {
    return this.shipmentsService.getAllShipments();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): ShipmentRecord {
    return this.shipmentsService.getShipmentById(id);
  }

  @Patch(':id/assign')
  public assignDriver(
    @Param('id') id: string,
    @Body('driverId') driverId: string,
  ): ShipmentRecord {
    return this.shipmentsService.assignDriver(id, driverId);
  }

  @Patch(':id/status')
  public updateStatus(
    @Param('id') id: string,
    @Body('status') status: ShipmentState,
  ): ShipmentRecord {
    return this.shipmentsService.updateStatus(id, status);
  }
}
