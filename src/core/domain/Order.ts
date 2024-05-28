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

export interface IOrder {
  id: number;
  customerId: number;
  processStage: PROCESS_STATUS;
  totalAmount: number;
  paymentStatus: PAYMENT_STATUS;
  createdAt: Date;
  updatedAt: Date;
}
