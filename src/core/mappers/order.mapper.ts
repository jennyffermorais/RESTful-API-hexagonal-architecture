import { CreateOrderDto } from "../../adapters/driver/api/controller/dto/OrderDto";
import { IOrder, PAYMENT_STATUS } from "../domain/Order";
import { IOrderProduct } from "../domain/OrderProduct";

export const toOrder = (data: CreateOrderDto): { order: Partial<IOrder>, products: Partial<IOrderProduct>[] } => {
    const { customerId, items, totalAmount, status } = data;

    const order: Partial<IOrder> = {
        clientId: customerId,
        processStage: status,
        totalAmount: totalAmount,
        paymentStatus: PAYMENT_STATUS.PENDING,
    };

    const products: Partial<IOrderProduct>[] = items.map(item => ({
        orderId: 0,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
    }));

    return { order, products };
}