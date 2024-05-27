import { Router } from 'express';
import { PaymentController } from '../adapters/driver/api/controller/PaymentController';
import { OrderService } from '../core/applications/services/OrderService';
import { PaymentServiceACL } from '../core/applications/services/PaymentService';
import { AppDataSource } from '../data-source';
import { Order } from '../adapters/driven/repository/Order';
import { TypeORMRepository } from '../adapters/driver/api/repository/TypeORMRepository';
import { IOrderService } from '../core/applications/ports/IOrderService';

const orderRepository = new TypeORMRepository<Order>(AppDataSource, Order);

const paymentController = new PaymentController(new PaymentServiceACL(), new OrderService(orderRepository));

const paymentRoute = Router();

paymentRoute.post('/payments/create', paymentController.createOrderPayment);
paymentRoute.post('/payments/update', paymentController.markOrderAsPaid);

export { paymentRoute };
