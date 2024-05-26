import { Router } from 'express';
import { PaymentController } from '../adapters/in/api/controller/PaymentController';
import { PaymentServiceACL } from '../adapters/out/external/PaymentService';
import { OrderService } from '../application/service/OrderService';

const paymentController = new PaymentController(new PaymentServiceACL(), new OrderService());

const paymentRoute = Router();

paymentRoute.post('/payments/create', paymentController.createOrderPayment);
paymentRoute.post('/payments/update', paymentController.markOrderAsPaid);

export { paymentRoute };
