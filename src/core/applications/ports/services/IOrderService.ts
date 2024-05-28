import { IOrder, PROCESS_STATUS } from '../../../domain/Order';
import { IOrderProduct } from '../../../domain/OrderProduct';

export interface IOrderService {
  // create(data: Partial<IOrder>): Promise<IOrder>;
  update(id: number, data: Partial<IOrder>): Promise<IOrder | null>;
  delete(id: number): Promise<boolean>;
  getById(id: number): Promise<IOrder | null>;
  getAll(): Promise<IOrder[]>;

  create(data: Partial<IOrder>, productsData: Partial<IOrderProduct>[]): Promise<IOrder>;
  getByStatus(status: PROCESS_STATUS): Promise<IOrder[]>;
  getByCreationDate(startDate: Date, endDate: Date): Promise<IOrder[]>;
  getByUpdateDate(startDate: Date, endDate: Date): Promise<IOrder[]>;
  isValidStatus(status: any): status is PROCESS_STATUS;
}
