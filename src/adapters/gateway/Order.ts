import { Between } from 'typeorm';
import { IOrder, PROCESS_STATUS } from '../../core/domain/Order';
import { IOrderProduct } from '../../core/domain/OrderProduct';
import { IRepository } from '../../core/applications/ports/repositories/IRepository';
import { IOrderService } from '../../core/applications/ports/services/IOrderService';
import { OrderEntity } from '../../core/entities/Order';
import { OrderProductEntity } from '../../core/entities/OrderProduct';
import { CreateOrderProductEntity } from '../../core/entities/CreateOrderProduct';
import { CreateOrderEntity } from '../../core/entities/CreateOrder';

export class OrderGateway implements IOrderService {
  private orderRepository: IRepository<OrderEntity>;
  private orderProductRepository: IRepository<OrderProductEntity>;

  constructor(orderRepository: IRepository<OrderEntity>, orderProductRepository: IRepository<OrderProductEntity>) {
    this.orderRepository = orderRepository;
    this.orderProductRepository = orderProductRepository;
  }

  public async create(orderData: Partial<CreateOrderEntity>, productsData: Partial<CreateOrderProductEntity>[]): Promise<OrderEntity> {
    const { id, ...restOrderData } = orderData;
    const order = await this.orderRepository.create(restOrderData);
    const orderProducts = productsData.map((product) => ({
      ...product,
      orderId: order.id,
    }));

    await this.orderProductRepository.createMany(orderProducts);

    return order;
  }

  public async update(id: number, data: Partial<OrderEntity>): Promise<OrderEntity | null> {
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

  public async getById(id: number): Promise<OrderEntity | null> {
    const order = await this.orderRepository.findOneBy({ id });

    return order || null;
  }

  getAll: IOrderService['getAll'] = async (payload = {}) => {
    const { processStage } = payload;
    return this.orderRepository.find({ where: { processStage } });
  };

  public isValidStatus = (status: any): status is PROCESS_STATUS => {
    return Object.values(PROCESS_STATUS).includes(status);
  };

  public async getByStatus(status: PROCESS_STATUS): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      where: { processStage: status },
      order: { id: 'ASC' },
    });
  }

  public async getByCreationDate(startDate: Date, endDate: Date): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      where: {
        date_audit: {
          createdAt: Between(startDate, endDate),
        },
      },
      order: { id: 'ASC' },
    });
  }

  public async getByUpdateDate(startDate: Date, endDate: Date): Promise<OrderEntity[]> {
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
