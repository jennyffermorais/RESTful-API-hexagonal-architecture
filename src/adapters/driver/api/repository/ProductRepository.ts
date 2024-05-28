import { DataSource, Repository } from 'typeorm';
import { IProductRepository } from '../../../../core/applications/ports/repositories/IProductRepository';
import { CATEGORIES } from '../../../../core/domain/Product';
import { Product } from '../../../driven/repository/Product';

export class ProductRepository implements IProductRepository {
  private repository: Repository<Product>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository('product');
  }

  create: IProductRepository['create'] = (data) => {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  };

  save: IProductRepository['save'] = (entity) => {
    return this.repository.save(entity);
  };

  findOneBy: IProductRepository['findOneBy'] = (where) => {
    return this.repository.findOneBy(where);
  };

  delete: IProductRepository['delete'] = (id) => {
    return this.repository.delete(id);
  };

  find: IProductRepository['find'] = (options) => {
    return this.repository.find({ where: { category: options?.category as CATEGORIES } });
  };
}
