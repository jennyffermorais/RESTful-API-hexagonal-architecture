export enum PROCESS_STATUS {
    RECEBIDO = 'RECEBIDO',
    'EM PREPARAÇÃO' = 'EM PREPARAÇÃO',
    PRONTO = 'PRONTO',
    FINALIZADO = 'FINALIZADO',
  }
  
  export enum PAYMENT_STATUS {
    PENDING = 'PENDING',
    PAID = 'PAID',
    CANCELLED = 'CANCELLED',
    FAILED = 'FAILED',
  }
  
  export class CreateOrderEntity {
    id?: number;
    customerId?: number;
    processStage?: PROCESS_STATUS;
    totalAmount?: number;
    paymentStatus?: PAYMENT_STATUS;
    createdAt?: Date;
    updatedAt?: Date;
  
    constructor(
      id: number,
      customerId: number,
      processStage: PROCESS_STATUS,
      totalAmount: number,
      paymentStatus: PAYMENT_STATUS,
      createdAt: Date,
      updatedAt: Date
    ) {
        (this.id = id),
        (this.customerId = customerId),
        (this.processStage = processStage),
        (this.totalAmount = totalAmount),
        (this.paymentStatus = paymentStatus),
        (this.createdAt = createdAt),
        (this.createdAt = updatedAt);
    }
  }
  