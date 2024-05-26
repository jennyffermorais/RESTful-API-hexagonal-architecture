import express from 'express';
import { OrderController } from '../adapters/in/api/controller/OrderController';

const orderController = new OrderController();

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
