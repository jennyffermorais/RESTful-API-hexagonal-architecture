import { PROCESS_STATUS } from '../../../../../core/domain/Order';

export class CreateOrderDto {
  customerId: number;
  items: Array<{
    productId: number;
    quantity: number;
    unitPrice: number;
  }>;
  totalAmount: number;
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
