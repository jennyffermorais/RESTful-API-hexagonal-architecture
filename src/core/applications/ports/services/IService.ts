export interface IService<T> {
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T | null>;
  delete(id: number): Promise<boolean>;
  getById(id: number): Promise<T | null>;
  getAll(where?: any): Promise<T[]>;
}
