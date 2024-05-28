import { IOrder, PAYMENT_STATUS } from '../../../../core/domain/Order';
import { IOrderProduct } from '../../../../core/domain/OrderProduct';
import { CreateOrderDto } from '../controller/dto/OrderDto';

export const toOrder = (data: CreateOrderDto): { order: Partial<IOrder>; products: Partial<IOrderProduct>[] } => {
  const { customerId, items, totalAmount, status } = data;

  const order: Partial<IOrder> = {
    customerId,
    processStage: status,
    totalAmount: totalAmount,
    paymentStatus: PAYMENT_STATUS.PENDING,
  };

  const products: Partial<IOrderProduct>[] = items.map((item) => ({
    orderId: 0,
    productId: item.productId,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
  }));

  return { order, products };
};
