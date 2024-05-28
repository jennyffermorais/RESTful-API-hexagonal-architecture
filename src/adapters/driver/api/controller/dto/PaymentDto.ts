export interface OrderPaymentRequest {
  orderId: number;
}

export interface MarkOrderAsPaidRequest {
  orderId: number;
  status: string;
}
