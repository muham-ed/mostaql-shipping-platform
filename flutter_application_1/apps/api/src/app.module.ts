import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ShipmentsController } from './modules/shipments/shipments.controller';
import { ShipmentsService } from './modules/shipments/shipments.service';
import { DriversController } from './modules/drivers/drivers.controller';
import { DriversService } from './modules/drivers/drivers.service';
import { DisputesController } from './modules/disputes/disputes.controller';
import { DisputesService } from './modules/disputes/disputes.service';
import { HealthController } from './modules/health/health.controller';
import { GeofenceValidatorService } from './modules/pod/services/geofence-validator.service';
import { CodCollectionService } from './modules/cod/services/collection.service';
import { TrackingGateway } from './realtime/gateways/tracking.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [
    HealthController,
    ShipmentsController,
    DriversController,
    DisputesController,
  ],
  providers: [
    ShipmentsService,
    DriversService,
    DisputesService,
    GeofenceValidatorService,
    CodCollectionService,
    TrackingGateway,
  ],
})
export class AppModule {}
