import { IPaymentService } from '../../core/applications/ports/services/IPaymentService';

export class PaymentGatewayACL implements IPaymentService {
  async requestPaymentUrl(payload: { paymentValue: number }): Promise<string> {
    return `https://payment-gateway.com/acl/${payload.paymentValue}`;
  }
}
