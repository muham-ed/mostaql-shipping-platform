import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';

export interface CodTransactionRecord {
  id: string;
  driverId: string;
  shipmentId: string;
  amountCollected: number;
  currency: string;
  collectedAt: Date;
  settled: boolean;
}

@Injectable()
export class CodCollectionService {
  private readonly DEFAULT_DRIVER_MAX_COD_LIMIT = 2000.0; // E.g. SAR/EGP limit before forcing cash settlement
  private readonly mockTransactions: Map<string, CodTransactionRecord[]> = new Map();

  /**
   * Checks if driver has exceeded maximum allowed un-settled cash on hand.
   */
  public verifyDriverCodWalletLimit(
    driverId: string,
    newCollectionAmount: number,
    maxLimit: number = this.DEFAULT_DRIVER_MAX_COD_LIMIT,
  ): void {
    const currentUnsettledCash = this.getDriverUnsettledCashTotal(driverId);

    if (currentUnsettledCash + newCollectionAmount > maxLimit) {
      throw new ForbiddenException(
        `COD limit exceeded. Current cash on hand: ${currentUnsettledCash}, Attempted collection: ${newCollectionAmount}. Maximum allowed limit is ${maxLimit}. Settlement required before accepting new COD orders.`
      );
    }
  }

  /**
   * Records cash collection upon successful parcel delivery.
   */
  public recordCashCollection(
    driverId: string,
    shipmentId: string,
    amount: number,
    currency: string = 'SAR',
  ): CodTransactionRecord {
    if (amount <= 0) {
      throw new BadRequestException('Collected COD amount must be greater than zero.');
    }

    this.verifyDriverCodWalletLimit(driverId, amount);

    const record: CodTransactionRecord = {
      id: `cod_tx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      driverId,
      shipmentId,
      amountCollected: amount,
      currency,
      collectedAt: new Date(),
      settled: false,
    };

    const driverRecords = this.mockTransactions.get(driverId) || [];
    driverRecords.push(record);
    this.mockTransactions.set(driverId, driverRecords);

    return record;
  }

  /**
   * Calculates total unsettled cash accumulated by a driver.
   */
  public getDriverUnsettledCashTotal(driverId: string): number {
    const driverRecords = this.mockTransactions.get(driverId) || [];
    return driverRecords
      .filter((tx) => !tx.settled)
      .reduce((sum, tx) => sum + tx.amountCollected, 0);
  }

  /**
   * Settles cash collected by supervisor / treasury.
   */
  public settleDriverCash(driverId: string, supervisorId: string): number {
    const driverRecords = this.mockTransactions.get(driverId) || [];
    const unsettled = driverRecords.filter((tx) => !tx.settled);

    let totalSettled = 0;
    unsettled.forEach((tx) => {
      tx.settled = true;
      totalSettled += tx.amountCollected;
    });

    return totalSettled;
  }
}
