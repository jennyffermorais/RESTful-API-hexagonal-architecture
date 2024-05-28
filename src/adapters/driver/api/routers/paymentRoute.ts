import { Request, Response, Router } from 'express';
import { OrderService } from '../../../../core/applications/services/OrderService';
import { PaymentServiceACL } from '../../../../core/applications/services/PaymentService';
import { AppDataSource } from '../../../../data-source';
import { Order } from '../../../driven/repository/Order';
import { OrderProduct } from '../../../driven/repository/OrderProduct';
import { PaymentController } from '../controller/PaymentController';
import { MarkOrderAsPaidRequest, OrderPaymentRequest } from '../controller/dto/PaymentDto';
import { TypeORMRepository } from '../repository/TypeORMRepository';

const orderRepository = new TypeORMRepository<Order>(AppDataSource, Order);
const orderProductRepository = new TypeORMRepository<OrderProduct>(AppDataSource, OrderProduct);
const paymentService = new PaymentServiceACL();
const orderService = new OrderService(orderRepository, orderProductRepository);
const paymentController = new PaymentController(paymentService, orderService);

const paymentRoute = Router();

paymentRoute.post('/payments/create', async (req: Request, res: Response) => {
  const requestBody: OrderPaymentRequest = req.body;
  const result = await paymentController.createOrderPayment(requestBody);
  if ('paymentUrl' in result) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});

paymentRoute.post('/payments/mark-as-paid', async (req: Request, res: Response) => {
  const requestBody: MarkOrderAsPaidRequest = req.body;
  const result = await paymentController.markOrderAsPaid(requestBody);
  if (result.message === 'Order paid successfully') {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});

export { paymentRoute };
