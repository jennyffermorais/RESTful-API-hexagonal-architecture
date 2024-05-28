export interface IRepository<T> {
  createMany(data: Partial<T>[]): Promise<T[]>;
  create(data: Partial<T>): Promise<T>;
  save(entity: T): Promise<T>;
  findOneBy(where: Partial<T>): Promise<T | null>;
  delete(id: number): Promise<{ affected?: number | null }>;
  find(options?: any): Promise<T[]>;
}
