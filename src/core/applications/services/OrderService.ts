import { Between } from 'typeorm';
import { IOrder, PROCESS_STATUS } from '../../domain/Order';
import { IOrderProduct } from '../../domain/OrderProduct';
import { IRepository } from '../ports/repositories/IRepository';
import { IOrderService } from '../ports/services/IOrderService';

export class OrderService implements IOrderService {
  private orderRepository: IRepository<IOrder>;
  private orderProductRepository: IRepository<IOrderProduct>;

  constructor(orderRepository: IRepository<IOrder>, orderProductRepository: IRepository<IOrderProduct>) {
    this.orderRepository = orderRepository;
    this.orderProductRepository = orderProductRepository;
  }

  public async create(orderData: Partial<IOrder>, productsData: Partial<IOrderProduct>[]): Promise<IOrder> {
    const { id, ...restOrderData } = orderData;
    const order = await this.orderRepository.create(restOrderData);
    const orderProducts = productsData.map((product) => ({
      ...product,
      orderId: order.id,
    }));

    await this.orderProductRepository.createMany(orderProducts);

    return order;
  }

  public async update(id: number, data: Partial<IOrder>): Promise<IOrder | null> {
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

  public async getById(id: number): Promise<IOrder | null> {
    const order = await this.orderRepository.findOneBy({ id });

    return order || null;
  }

  public async getAll(): Promise<IOrder[]> {
    return this.orderRepository.find();
  }

  public isValidStatus = (status: any): status is PROCESS_STATUS => {
    return Object.values(PROCESS_STATUS).includes(status);
  };

  public async getByStatus(status: PROCESS_STATUS): Promise<IOrder[]> {
    return this.orderRepository.find({
      where: { processStage: status },
      order: { id: 'ASC' },
    });
  }

  public async getByCreationDate(startDate: Date, endDate: Date): Promise<IOrder[]> {
    return this.orderRepository.find({
      where: {
        date_audit: {
          createdAt: Between(startDate, endDate),
        },
      },
      order: { id: 'ASC' },
    });
  }

  public async getByUpdateDate(startDate: Date, endDate: Date): Promise<IOrder[]> {
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
