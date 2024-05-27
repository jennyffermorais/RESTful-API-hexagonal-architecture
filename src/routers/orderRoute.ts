import express from 'express';
import { OrderController } from '../adapters/driver/api/controller/OrderController';
import { IOrderService } from '../core/applications/ports/IOrderService';
import { TypeORMRepository } from '../core/applications/repository/TypeORMRepository';
import { Order } from '../adapters/driven/repository/Order';
import { OrderService } from '../core/applications/services/OrderService';
import { AppDataSource } from '../data-source';

const orderRepository = new TypeORMRepository<Order>(AppDataSource, Order);
const orderService: IOrderService = new OrderService(orderRepository);

const orderController = new OrderController(orderService);

const router = express.Router();

router.use(express.json());

router.post('/orders', (req, res) => orderController.create(req, res));
router.put('/orders/:id', (req, res) => orderController.update(req, res));
router.delete('/orders/:id', (req, res) => orderController.delete(req, res));
router.get('/orders/:id', (req, res) => orderController.getOrderById(req, res));
router.get('/orders', (req, res) => orderController.getAllOrders(req, res));
router.get('/orders/status/:status', (req, res) => orderController.getOrdersByStatus(req, res));
router.get('/orders/creation-date', (req, res) => orderController.getOrdersByCreationDate(req, res));
router.get('/orders/update-date', (req, res) => orderController.getOrdersByUpdateDate(req, res));

export default router;
