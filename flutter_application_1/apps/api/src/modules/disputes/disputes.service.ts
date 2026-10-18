import { Injectable, NotFoundException } from '@nestjs/common';

export interface DisputeRecord {
  id: string;
  shipmentId: string;
  raisedByUserId: string;
  reason: string;
  status: 'open' | 'under_review' | 'resolved' | 'rejected';
  resolutionNotes?: string;
  createdAt: Date;
}

@Injectable()
export class DisputesService {
  private readonly disputes: Map<string, DisputeRecord> = new Map();

  public createDispute(data: {
    shipmentId: string;
    raisedByUserId: string;
    reason: string;
  }): DisputeRecord {
    const id = `dsp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const dispute: DisputeRecord = {
      id,
      shipmentId: data.shipmentId,
      raisedByUserId: data.raisedByUserId,
      reason: data.reason,
      status: 'open',
      createdAt: new Date(),
    };
    this.disputes.set(id, dispute);
    return dispute;
  }

  public resolveDispute(
    id: string,
    status: 'resolved' | 'rejected',
    notes: string,
  ): DisputeRecord {
    const dispute = this.disputes.get(id);
    if (!dispute) {
      throw new NotFoundException(`Dispute with ID ${id} not found.`);
    }
    dispute.status = status;
    dispute.resolutionNotes = notes;
    return dispute;
  }

  public getAllDisputes(): DisputeRecord[] {
    return Array.from(this.disputes.values());
  }
}
