import { IClient } from '../../domain/Client';
import { IService } from './IService';

export interface IClientService extends IService<IClient> {
  getClientByDocument(documentNum: string): Promise<IClient | null>;
}
