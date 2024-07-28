export class PaymentGatewayACL {
  private paymentGateway: PaymentGatewayACL;
  async requestPaymentUrl(payload: { paymentValue: number }): Promise<string> {
    try {
      const payment = await this.paymentGateway.requestPaymentUrl(payload);
      return payment;
    } catch (error) {
      throw error;
    }
  }
}
