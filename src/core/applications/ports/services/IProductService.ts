import { IProduct } from '../../../domain/Product';

export interface IProductService {
  create(data: Partial<IProduct>): Promise<IProduct>;
  update(id: number, data: Partial<IProduct>): Promise<IProduct | null>;
  delete(id: number): Promise<boolean>;
  getById(id: number): Promise<IProduct | null>;
  getAll(payload?: { category?: string }): Promise<IProduct[]>;
}
