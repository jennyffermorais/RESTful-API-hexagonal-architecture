import { PaymentServiceI } from '../../../application/port/out/PaymentService';

export class PaymentServiceACL implements PaymentServiceI {
  async requestPaymentUrl(payload: { paymentValue: number }): Promise<string> {
    return `https://payment-gateway.com/acl/${payload.paymentValue}`;
  }
}
