import { Request, Response } from 'express';
import { CreateClientDto, UpdateClientDto } from './dto/ClientDto';
import { IClientService } from '../../../../core/applications/ports/IClientService';

export class ClientController {

  private clientService: IClientService;

  constructor(clientService: IClientService) {
    this.clientService = clientService;
  }

  async create(req: Request, res: Response): Promise<Response> {
    const createClientDto: CreateClientDto = req.body;
    const client = await this.clientService.create(createClientDto);
    return res.status(201).json(client);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const updateClientDto: UpdateClientDto = req.body;
    const client = await this.clientService.update(id, updateClientDto);
    if (client) {
      return res.json(client);
    } else {
      return res.status(404).json({ message: 'Client not found' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    await this.clientService.delete(id);
    return res.status(204).send();
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const client = await this.clientService.getById(id);
    if (client) {
      return res.json(client);
    } else {
      return res.status(404).json({ message: 'Client not found' });
    }
  }
  async getClientByDocument(req: Request, res: Response): Promise<Response> {
    const documentNum = req.params.documentNum;
    const client = await this.clientService.getClientByDocument(documentNum);
    if (client) {
      return res.json(client);
    } else {
      return res.status(404).json({ message: 'Client not found' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const clients = await this.clientService.getAll();
    return res.json(clients);
  }
}
