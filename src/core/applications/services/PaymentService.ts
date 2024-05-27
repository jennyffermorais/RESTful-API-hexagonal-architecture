import { IPaymentService } from '../ports/PaymentService';

export class PaymentServiceACL implements IPaymentService {
  async requestPaymentUrl(payload: { paymentValue: number }): Promise<string> {
    return `https://payment-gateway.com/acl/${payload.paymentValue}`;
  }
}
