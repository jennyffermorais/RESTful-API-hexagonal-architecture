import { IPaymentService } from '../ports/services/IPaymentService';

export class PaymentServiceACL implements IPaymentService {
  async requestPaymentUrl(payload: { paymentValue: number }): Promise<string> {
    return `https://payment-gateway.com/acl/${payload.paymentValue}`;
  }
}
