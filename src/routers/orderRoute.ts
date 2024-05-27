import express from 'express';
import { OrderController } from '../adapters/driver/api/controller/OrderController';
import { IOrderService } from '../core/applications/ports/IOrderService';
import { TypeORMRepository } from '../adapters/driver/api/repository/TypeORMRepository';
import { Order } from '../adapters/driven/repository/Order';
import { OrderService } from '../core/applications/services/OrderService';
import { AppDataSource } from '../data-source';

const orderRepository = new TypeORMRepository<Order>(AppDataSource, Order);
const orderService: IOrderService = new OrderService(orderRepository);

const orderController = new OrderController(orderService);

const router = express.Router();

router.use(express.json());

router.post('/orders', async (req, res) => {
  try {
    const result = await orderController.create(req.body, res.status.bind(res, 404), res.status.bind(res, 500));
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/orders/:id', async (req, res) => {
  try {
    const result = await orderController.update(req.params.id, req.body, res.status.bind(res, 404), res.status.bind(res, 500));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/orders/:id', async (req, res) => {
  try {
    await orderController.delete(req.params.id, res.status.bind(res, 404), res.status.bind(res, 500));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/orders/:id', async (req, res) => {
  try {
    const result = await orderController.getOrderById(req.params.id, res.status.bind(res, 404), res.status.bind(res, 500));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const result = await orderController.getAllOrders(res.status.bind(res, 500));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/orders/status/:status', async (req, res) => {
  try {
    const result = await orderController.getOrdersByStatus(req.params.status, res.status.bind(res, 400), res.status.bind(res, 500));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/orders/creation-date', async (req, res) => {
  try {
    const result = await orderController.getOrdersByCreationDate(req.query.startDate as string, req.query.endDate as string, res.status.bind(res, 400), res.status.bind(res, 500));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/orders/update-date', async (req, res) => {
  try {
    const result = await orderController.getOrdersByUpdateDate(req.query.startDate as string, req.query.endDate as string, res.status.bind(res, 400), res.status.bind(res, 500));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
