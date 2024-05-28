import { Repository, DataSource, ObjectLiteral } from 'typeorm';
import { IRepository } from '../../../../core/applications/ports/IRepository';

export class TypeORMRepository<T extends ObjectLiteral> implements IRepository<T> {
  private repository: Repository<T>;

  constructor(dataSource: DataSource, entity: new () => T) {
    this.repository = dataSource.getRepository(entity);
  }

  create(data: T): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  createMany(data: T[]): Promise<T[]> {
    const entities = this.repository.create(data);
    return this.repository.save(entities);
  }

  save(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  findOneBy(where: Partial<T>): Promise<T | null> {
    return this.repository.findOneBy(where);
  }

  delete(id: number): Promise<{ affected?: number | null }> {
    return this.repository.delete(id);
  }

  find(options: any): Promise<T[]> {
    return this.repository.find(options);
  }
}
