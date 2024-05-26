import { Router } from 'express';
import { PaymentController } from '../adapters/driver/api/controller/PaymentController';
import { OrderService } from '../core/applications/services/OrderService';
import { PaymentServiceACL } from '../core/applications/services/PaymentService';

const paymentController = new PaymentController(new PaymentServiceACL(), new OrderService());

const paymentRoute = Router();

paymentRoute.post('/payments/create', paymentController.createOrderPayment);
paymentRoute.post('/payments/update', paymentController.markOrderAsPaid);

export { paymentRoute };
