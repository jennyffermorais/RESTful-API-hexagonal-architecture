import { IClient } from '../../../domain/Client';

export interface IClientService {
  create(data: Partial<IClient>): Promise<IClient>;
  update(id: number, data: Partial<IClient>): Promise<IClient | null>;
  delete(id: number): Promise<boolean>;
  getById(id: number): Promise<IClient | null>;
  getAll(filters?: { documentNum?: string }): Promise<IClient[]>;
  getClientByDocument(documentNum: string): Promise<IClient | null>;
}
