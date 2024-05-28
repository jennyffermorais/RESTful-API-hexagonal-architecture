import { Post, Route, Body, Tags } from 'tsoa';
import { OrderService } from '../../../../core/applications/services/OrderService';
import { IPaymentService } from '../../../../core/applications/ports/services/IPaymentService';
import { PAYMENT_STATUS } from '../../../../core/domain/Order';
import { MarkOrderAsPaidRequest, OrderPaymentRequest } from './dto/PaymentDto';

@Route('payments')
@Tags('Payments')
export class PaymentController {
  constructor(
    private readonly paymentGatewayService: IPaymentService,
    private readonly orderService: OrderService
  ) {}

  @Post('create')
  public async createOrderPayment(@Body() requestBody: OrderPaymentRequest): Promise<{ paymentUrl: string } | { message: string }> {
    const { orderId } = requestBody;
    const order = await this.orderService.getById(orderId);
    if (!order) {
      return { message: 'Order not found' };
    }
    if (order.paymentStatus === PAYMENT_STATUS.PAID) {
      return { message: 'Order already paid' };
    }
    if (order.paymentStatus === PAYMENT_STATUS.CANCELLED) {
      return { message: 'Order cancelled' };
    }
    if (order.paymentStatus !== PAYMENT_STATUS.PENDING) {
      return { message: 'Order is not in a valid payment status to proceed' };
    }

    const paymentUrl = await this.paymentGatewayService.requestPaymentUrl({ paymentValue: order.totalAmount });

    return { paymentUrl };
  }

  @Post('mark-as-paid')
  public async markOrderAsPaid(@Body() requestBody: MarkOrderAsPaidRequest): Promise<{ message: string }> {
    const { orderId, status: paymentResponseStatus } = requestBody;
    const order = await this.orderService.getById(orderId);

    if (!order) {
      return { message: 'Order not found' };
    }
    if (order.paymentStatus === PAYMENT_STATUS.PAID) {
      return { message: 'Order already paid' };
    }
    if (order.paymentStatus === PAYMENT_STATUS.CANCELLED) {
      return { message: 'Order cancelled' };
    }
    if (order.paymentStatus !== PAYMENT_STATUS.PENDING) {
      return { message: 'Order is not in a valid payment status to proceed' };
    }

    if (paymentResponseStatus !== 'PAID') {
      await this.orderService.update(orderId, { paymentStatus: PAYMENT_STATUS.FAILED });
    } else {
      await this.orderService.update(orderId, { paymentStatus: PAYMENT_STATUS.PAID });
    }

    return { message: 'Order paid successfully' };
  }
}
