import { Client } from '../../../adapters/driven/repository/Client';
import { IRepository } from '../ports/IRepository';

export class ClientService {
  private clientRepository: IRepository<Client>;

  constructor(clientRepository: IRepository<Client>) {
    this.clientRepository = clientRepository;
  }

  public async create(clientData: Partial<Client>): Promise<Client> {
    const client = await this.clientRepository.create(clientData);
    return this.clientRepository.save(client);
  }

  public async update(id: number, clientData: Partial<Client>): Promise<Client | null> {
    const client = await this.clientRepository.findOneBy({ id });

    if (!client) {
      return null;
    }

    Object.assign(client, clientData);
    return this.clientRepository.save(client);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.clientRepository.delete(id);

    return result.affected !== undefined && result.affected! > 0;
  }

  public async getById(id: number): Promise<Client | null> {
    const client = await this.clientRepository.findOneBy({ id });

    return client || null;
  }

  public async getClientByDocument(documentNum: string): Promise<Client | null> {
    const client = await this.clientRepository.findOneBy({ documentNum });

    return client || null;
  }

  public async getAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }
}
