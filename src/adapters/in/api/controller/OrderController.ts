import { Request, Response } from 'express';
import { OrderService } from '../../../../application/service/OrderService';
import { PROCESS_STATUS } from '../../../../domain/model/Order';
import { CreateOrderDto, UpdateOrderDto } from '../dto/OrderDto';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const createOrderDto: CreateOrderDto = req.body;
    try {
      const order = await this.orderService.create(createOrderDto);
      return res.status(201).json(order);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updateOrderDto: UpdateOrderDto = req.body;
    try {
      const order = await this.orderService.update(Number(id), updateOrderDto);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const success = await this.orderService.delete(Number(id));
      if (!success) {
        return res.status(404).json({ message: 'Order not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async getOrderById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const order = await this.orderService.getOrderById(Number(id));
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async getAllOrders(req: Request, res: Response): Promise<Response> {
    try {
      const orders = await this.orderService.getAllOrders();
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async getOrdersByStatus(req: Request, res: Response): Promise<Response> {
    const { status } = req.params;

    if (!this.orderService.isValidStatus(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    try {
      const orders = await this.orderService.getOrdersByStatus(status as PROCESS_STATUS);
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async getOrdersByCreationDate(req: Request, res: Response): Promise<Response> {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    try {
      const orders = await this.orderService.getOrdersByCreationDate(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async getOrdersByUpdateDate(req: Request, res: Response): Promise<Response> {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    try {
      const orders = await this.orderService.getOrdersByUpdateDate(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
