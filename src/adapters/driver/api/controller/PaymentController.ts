import { Body, Post, Route, Tags } from 'tsoa';
import { IPaymentService } from '../../../../core/applications/ports/services/IPaymentService';
import { OrderService } from '../../../../core/applications/services/OrderService';
import { PAYMENT_STATUS } from '../../../../core/domain/Order';
import { MarkOrderAsPaidRequest, OrderPaymentRequest } from './dto/PaymentDto';
import { PaymentGatewayACL } from '../../../gateway/Payment';
import { PaymentGatewayACLUseCase } from '../../../../core/usecases/Payment';
import { OrderEntity } from '../../../../core/entities/Order';
import { IRepository } from '../../../../core/applications/ports/repositories/IRepository';
import { OrderGateway } from '../../../gateway/Order';
import { OrderUseCase } from '../../../../core/usecases/Order';
import { OrderProductEntity } from '../../../../core/entities/OrderProduct';

@Route('payments')
@Tags('Payments')
export class PaymentController {
  private orderDataSource: IRepository<OrderEntity>;
  private orderProductDataSource: IRepository<OrderProductEntity>;
  constructor(
  ) {}

  @Post('create')
  public async createOrderPayment(
    @Body() requestBody: OrderPaymentRequest
  ): Promise<{ paymentUrl: string } | { message: string }> {
    const orderGateway = new OrderGateway(this.orderDataSource, this.orderProductDataSource);
    const orderUseCase = new OrderUseCase(orderGateway);
    const paymentUseCase = new PaymentGatewayACLUseCase();

    const { orderId } = requestBody;

    const order = await orderUseCase.getById(orderId);
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

    const paymentUrl = await paymentUseCase.requestPaymentUrl({ paymentValue: order.totalAmount });

    return { paymentUrl };
  }

  @Post('mark-as-paid')
  public async markOrderAsPaid(@Body() requestBody: MarkOrderAsPaidRequest): Promise<{ message: string }> {
    const orderGateway = new OrderGateway(this.orderDataSource, this.orderProductDataSource);
    const orderUseCase = new OrderUseCase(orderGateway);
    const { orderId, status: paymentResponseStatus } = requestBody;
    const order = await orderUseCase.getById(orderId);

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
      await orderUseCase.update(orderId, { paymentStatus: PAYMENT_STATUS.FAILED });
    } else {
      await orderUseCase.update(orderId, { paymentStatus: PAYMENT_STATUS.PAID });
    }

    return { message: 'Order paid successfully' };
  }
}
