import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

export interface LocationUpdatePayload {
  driverId: string;
  shipmentId?: string;
  lat: number;
  lng: number;
  speedKmh?: number;
  heading?: number;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/realtime-tracking',
})
export class TrackingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: any;

  public handleConnection(client: any) {
    console.log(`Realtime client connected: ${client.id}`);
  }

  public handleDisconnect(client: any) {
    console.log(`Realtime client disconnected: ${client.id}`);
  }

  @SubscribeMessage('driver_location_update')
  public handleLocationUpdate(
    @ConnectedSocket() client: any,
    @MessageBody() payload: LocationUpdatePayload,
  ) {
    // Broadcast updated location to subscribers tracking this shipment/driver
    if (payload.shipmentId) {
      this.server.emit(`tracking_${payload.shipmentId}`, payload);
    }
    this.server.emit(`driver_${payload.driverId}_location`, payload);
    this.server.emit('admin_live_map_update', payload);

    return { status: 'received', timestamp: new Date().toISOString() };
  }
}
