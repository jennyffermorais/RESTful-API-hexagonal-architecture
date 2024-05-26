import { Request, Response } from 'express';
import { ClientService } from '../../../../application/service/ClientService';
import { CreateClientDto, UpdateClientDto } from '../dto/ClientDto';

export class ClientController {
   private clientService = new ClientService();

   async createClient(req: Request, res: Response): Promise<Response> {
      const createClientDto: CreateClientDto = req.body;
      const client = await this.clientService.createClient(createClientDto);
      return res.status(201).json(client);
   }

   async updateClient(req: Request, res: Response): Promise<Response> {
      const id = parseInt(req.params.id, 10);
      const updateClientDto: UpdateClientDto = req.body;
      const client = await this.clientService.updateClient(
         id,
         updateClientDto
      );
      if (client) {
         return res.json(client);
      } else {
         return res.status(404).json({ message: 'Client not found' });
      }
   }

   async deleteClient(req: Request, res: Response): Promise<Response> {
      const id = parseInt(req.params.id, 10);
      await this.clientService.deleteClient(id);
      return res.status(204).send();
   }

   async getClientById(req: Request, res: Response): Promise<Response> {
      const id = parseInt(req.params.id, 10);
      const client = await this.clientService.getClientById(id);
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

   async getAllClients(req: Request, res: Response): Promise<Response> {
      const clients = await this.clientService.getAllClients();
      return res.json(clients);
   }
}
