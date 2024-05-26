export interface PaymentServiceI {
  requestPaymentUrl(payload: { paymentValue: number }): Promise<string>;
}
