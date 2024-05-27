import { IClient } from '../../domain/Client';
import { IRepository } from '../ports/IRepository';

export class ClientService {
  private clientRepository: IRepository<IClient>;

  constructor(clientRepository: IRepository<IClient>) {
    this.clientRepository = clientRepository;
  }

  public async create(clientData: Partial<IClient>): Promise<IClient> {
    const client = await this.clientRepository.create(clientData);
    return this.clientRepository.save(client);
  }

  public async update(id: number, clientData: Partial<IClient>): Promise<IClient | null> {
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

  public async getById(id: number): Promise<IClient | null> {
    const client = await this.clientRepository.findOneBy({ id });

    return client || null;
  }

  public async getClientByDocument(documentNum: string): Promise<IClient | null> {
    const client = await this.clientRepository.findOneBy({ documentNum });

    return client || null;
  }

  public async getAll(): Promise<IClient[]> {
    return this.clientRepository.find();
  }
}
