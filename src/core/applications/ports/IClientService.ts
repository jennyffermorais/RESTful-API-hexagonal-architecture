import { Client } from '../../../adapters/driven/repository/Client';
import { IService } from './IService';

export interface IClientService extends IService<Client> {
    getClientByDocument(documentNum: string): Promise<Client | null> 
}
