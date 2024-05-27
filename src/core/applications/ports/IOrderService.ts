import { Order, PROCESS_STATUS } from '../../../adapters/driven/repository/Order'
import { IService } from './IService';

export interface IOrderService extends IService<Order> {
    getByStatus(status: PROCESS_STATUS): Promise<Order[]>
    getByCreationDate(startDate: Date, endDate: Date): Promise<Order[]>
    getByUpdateDate(startDate: Date, endDate: Date): Promise<Order[]>
    isValidStatus(status: any): status is PROCESS_STATUS
}
