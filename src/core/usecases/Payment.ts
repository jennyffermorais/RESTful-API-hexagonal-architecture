export class PaymentGatewayACLUseCase {
  private paymentGateway: PaymentGatewayACLUseCase;
  async requestPaymentUrl(payload: { paymentValue: number }): Promise<string> {
    try {
      const payment = await this.paymentGateway.requestPaymentUrl(payload);
      return payment;
    } catch (error) {
      throw error;
    }
  }
}
