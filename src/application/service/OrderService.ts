import { Between } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import { Order, PROCESS_STATUS } from '../../domain/model/Order';

export class OrderService {
  private orderRepository = AppDataSource.getRepository(Order);

  public async create(data: Partial<Order>): Promise<Order> {
    const order = this.orderRepository.create(data);
    return this.orderRepository.save(order);
  }

  public async update(id: number, data: Partial<Order>): Promise<Order | null> {
    const order = await this.orderRepository.findOneBy({ id });

    if (!order) {
      return null;
    }

    Object.assign(order, data);
    return this.orderRepository.save(order);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.orderRepository.delete(id);

    return result.affected !== undefined && result.affected! > 0;
  }

  public async getOrderById(id: number): Promise<Order | null> {
    const order = await this.orderRepository.findOneBy({ id });

    return order || null;
  }

  public async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  public isValidStatus = (status: any): status is PROCESS_STATUS => {
    return Object.values(PROCESS_STATUS).includes(status);
  };

  public async getOrdersByStatus(status: PROCESS_STATUS): Promise<Order[]> {
    return this.orderRepository.find({
      where: { processStage: status },
      order: { id: 'ASC' },
    });
  }

  public async getOrdersByCreationDate(startDate: Date, endDate: Date): Promise<Order[]> {
    return this.orderRepository.find({
      where: {
        date_audit: {
          createdAt: Between(startDate, endDate),
        },
      },
      order: { id: 'ASC' },
    });
  }

  public async getOrdersByUpdateDate(startDate: Date, endDate: Date): Promise<Order[]> {
    return this.orderRepository.find({
      where: {
        date_audit: {
          updatedAt: Between(startDate, endDate),
        },
      },
      order: { id: 'ASC' },
    });
  }
}
