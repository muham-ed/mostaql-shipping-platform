import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TRANSITIONS, ShipmentState } from './shipment-state-machine';

export interface CreateShipmentDto {
  companyId: string;
  senderName: string;
  senderPhone: string;
  senderLat: number;
  senderLng: number;
  recipientName: string;
  recipientPhone: string;
  recipientLat: number;
  recipientLng: number;
  codAmount?: number;
  notes?: string;
}

export interface ShipmentRecord {
  id: string;
  trackingNumber: string;
  companyId: string;
  driverId?: string;
  status: ShipmentState;
  senderName: string;
  senderPhone: string;
  senderLat: number;
  senderLng: number;
  recipientName: string;
  recipientPhone: string;
  recipientLat: number;
  recipientLng: number;
  codAmount: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class ShipmentsService {
  private readonly shipments: Map<string, ShipmentRecord> = new Map();

  public createShipment(dto: CreateShipmentDto): ShipmentRecord {
    const id = `shp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const trackingNumber = `TRK-${Math.floor(100000 + Math.random() * 900000)}`;

    const shipment: ShipmentRecord = {
      id,
      trackingNumber,
      companyId: dto.companyId,
      status: 'pending',
      senderName: dto.senderName,
      senderPhone: dto.senderPhone,
      senderLat: dto.senderLat,
      senderLng: dto.senderLng,
      recipientName: dto.recipientName,
      recipientPhone: dto.recipientPhone,
      recipientLat: dto.recipientLat,
      recipientLng: dto.recipientLng,
      codAmount: dto.codAmount || 0,
      notes: dto.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.shipments.set(id, shipment);
    return shipment;
  }

  public getShipmentById(id: string): ShipmentRecord {
    const shipment = this.shipments.get(id);
    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found.`);
    }
    return shipment;
  }

  public assignDriver(shipmentId: string, driverId: string): ShipmentRecord {
    const shipment = this.getShipmentById(shipmentId);
    this.transitionState(shipment, 'assigned');
    shipment.driverId = driverId;
    return shipment;
  }

  public updateStatus(shipmentId: string, newState: ShipmentState): ShipmentRecord {
    const shipment = this.getShipmentById(shipmentId);
    this.transitionState(shipment, newState);
    return shipment;
  }

  public getAllShipments(): ShipmentRecord[] {
    return Array.from(this.shipments.values());
  }

  private transitionState(shipment: ShipmentRecord, targetState: ShipmentState): void {
    const allowed = TRANSITIONS[shipment.status];
    if (!allowed.includes(targetState)) {
      throw new BadRequestException(
        `Invalid status transition from '${shipment.status}' to '${targetState}'. Allowed transitions: ${allowed.join(', ')}`,
      );
    }
    shipment.status = targetState;
    shipment.updatedAt = new Date();
  }
}
