import { Between } from 'typeorm';
import { Order, PROCESS_STATUS } from '../../../adapters/driven/repository/Order';
import { IRepository } from '../ports/IRepository';

export class OrderService {
  private orderRepository: IRepository<Order>;

  constructor(orderRepository: IRepository<Order>) {
    this.orderRepository = orderRepository;
  }

  public async create(data: Partial<Order>): Promise<Order> {
    const order = await this.orderRepository.create(data);
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

  public async getById(id: number): Promise<Order | null> {
    const order = await this.orderRepository.findOneBy({ id });

    return order || null;
  }

  public async getAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  public isValidStatus = (status: any): status is PROCESS_STATUS => {
    return Object.values(PROCESS_STATUS).includes(status);
  };

  public async getByStatus(status: PROCESS_STATUS): Promise<Order[]> {
    return this.orderRepository.find({
      where: { processStage: status },
      order: { id: 'ASC' },
    });
  }

  public async getByCreationDate(startDate: Date, endDate: Date): Promise<Order[]> {
    return this.orderRepository.find({
      where: {
        date_audit: {
          createdAt: Between(startDate, endDate),
        },
      },
      order: { id: 'ASC' },
    });
  }

  public async getByUpdateDate(startDate: Date, endDate: Date): Promise<Order[]> {
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
