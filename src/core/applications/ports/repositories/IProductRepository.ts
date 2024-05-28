import { IProduct } from '../../../domain/Product';

export interface IProductRepository {
  create(data: Partial<IProduct>): Promise<IProduct>;
  save(entity: IProduct): Promise<IProduct>;
  findOneBy(where: Partial<IProduct>): Promise<IProduct | null>;
  delete(id: number): Promise<{ affected?: number | null }>;
  find(options?: { category?: string }): Promise<IProduct[]>;
}
