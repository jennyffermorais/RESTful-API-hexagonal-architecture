import { Order, PROCESS_STATUS } from '../../../adapters/driven/repository/Order'

export interface IOrderService {
  create(data: Partial<Order>): Promise<Order>
  update(id: number, data: Partial<Order>): Promise<Order | null>
  delete(id: number): Promise<boolean>
  getOrderById(id: number): Promise<Order | null>
  getAllOrders(): Promise<Order[]>
  getOrdersByStatus(status: PROCESS_STATUS): Promise<Order[]>
  getOrdersByCreationDate(startDate: Date, endDate: Date): Promise<Order[]>
  getOrdersByUpdateDate(startDate: Date, endDate: Date): Promise<Order[]>
  isValidStatus(status: any): status is PROCESS_STATUS
}
