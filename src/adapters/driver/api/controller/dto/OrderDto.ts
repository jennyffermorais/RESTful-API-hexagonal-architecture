import { PROCESS_STATUS } from '../../../../driven/repository/Order';

export class CreateOrderDto {
  customerId: number;
  items: Array<{
    productId: number;
    quantity: number;
  }>;
  totalAmount: number;
  status: PROCESS_STATUS;
}

export class UpdateOrderDto {
  customerId?: number;
  items?: Array<{
    productId: number;
    quantity: number;
  }>;
  totalAmount?: number;
  status?: PROCESS_STATUS;
}
