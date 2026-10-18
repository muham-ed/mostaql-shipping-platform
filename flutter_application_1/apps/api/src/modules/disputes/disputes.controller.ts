import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { DisputesService, DisputeRecord } from './disputes.service';

@Controller('disputes')
export class DisputesController {
  constructor(private readonly disputesService: DisputesService) {}

  @Post()
  public create(
    @Body()
    body: {
      shipmentId: string;
      raisedByUserId: string;
      reason: string;
    },
  ): DisputeRecord {
    return this.disputesService.createDispute(body);
  }

  @Get()
  public findAll(): DisputeRecord[] {
    return this.disputesService.getAllDisputes();
  }

  @Patch(':id/resolve')
  public resolve(
    @Param('id') id: string,
    @Body('status') status: 'resolved' | 'rejected',
    @Body('notes') notes: string,
  ): DisputeRecord {
    return this.disputesService.resolveDispute(id, status, notes);
  }
}
