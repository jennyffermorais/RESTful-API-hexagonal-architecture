export interface IPaymentService {
  requestPaymentUrl(payload: { paymentValue: number }): Promise<string>;
}
