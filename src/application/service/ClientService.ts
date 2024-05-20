import { AppDataSource } from '../../../data-source';
import { Client } from '../../domain/model/Client';

export class ClientService {
   private clientRepository = AppDataSource.getRepository(Client);

   public async createClient(clientData: Partial<Client>): Promise<Client> {
      const client = this.clientRepository.create(clientData);
      return this.clientRepository.save(client);
   }

   public async updateClient(
      id: number,
      clientData: Partial<Client>
   ): Promise<Client | null> {
      const client = await this.clientRepository.findOneBy({ id });

      if (!client) {
         return null;
      }

      Object.assign(client, clientData);
      return this.clientRepository.save(client);
   }

   public async deleteClient(id: number): Promise<boolean> {
      const result = await this.clientRepository.delete(id);

      return result.affected !== undefined && result.affected > 0;
   }

   public async getClientById(id: number): Promise<Client | null> {
      const client = await this.clientRepository.findOneBy({ id });

      return client || null;
   }

   public async getAllClients(): Promise<Client[]> {
      return this.clientRepository.find();
   }
}
