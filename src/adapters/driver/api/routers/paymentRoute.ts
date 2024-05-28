import { Router } from 'express';
import { OrderService } from '../../../../core/applications/services/OrderService';
import { PaymentServiceACL } from '../../../../core/applications/services/PaymentService';
import { AppDataSource } from '../../../../data-source';
import { Order } from '../../../driven/repository/Order';
import { OrderProduct } from '../../../driven/repository/OrderProduct';
import { PaymentController } from '../controller/PaymentController';
import { TypeORMRepository } from '../repository/TypeORMRepository';

const orderRepository = new TypeORMRepository<Order>(AppDataSource, Order);
const orderProductRepository = new TypeORMRepository<OrderProduct>(AppDataSource, OrderProduct);
const paymentController = new PaymentController(
  new PaymentServiceACL(),
  new OrderService(orderRepository, orderProductRepository)
);

const paymentRoute = Router();
paymentRoute.post('/payments/create', paymentController.createOrderPayment);
paymentRoute.post('/payments/update', paymentController.markOrderAsPaid);

export { paymentRoute };
