import { ICustomer } from '../../../domain/Customer';

export interface ICustomerService {
  create(data: Partial<ICustomer>): Promise<ICustomer>;
  update(id: number, data: Partial<ICustomer>): Promise<ICustomer | null>;
  delete(id: number): Promise<boolean>;
  getById(id: number): Promise<ICustomer | null>;
  getAll(filters?: { documentNum?: string }): Promise<ICustomer[]>;
  getCustomerByDocument(documentNum: string): Promise<ICustomer | null>;
}
