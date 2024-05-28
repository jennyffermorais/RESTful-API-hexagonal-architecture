import { IOrder, PROCESS_STATUS } from '../../domain/Order';
import { IService } from './IService';

export interface IOrderService extends IService<IOrder> {
  getByStatus(status: PROCESS_STATUS): Promise<IOrder[]>;
  getByCreationDate(startDate: Date, endDate: Date): Promise<IOrder[]>;
  getByUpdateDate(startDate: Date, endDate: Date): Promise<IOrder[]>;
  isValidStatus(status: any): status is PROCESS_STATUS;
}
