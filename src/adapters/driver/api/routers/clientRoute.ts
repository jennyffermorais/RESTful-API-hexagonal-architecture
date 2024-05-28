import express, { Router } from 'express';
import { IClientService } from '../../../../core/applications/ports/services/IClientService';
import { ClientService } from '../../../../core/applications/services/ClientService';
import { AppDataSource } from '../../../../data-source';
import { Client } from '../../../driven/repository/Client';
import { ClientController } from '../controller/ClientController';
import { TypeORMRepository } from '../repository/TypeORMRepository';

const clientRepository = new TypeORMRepository<Client>(AppDataSource, Client);
const clientService: IClientService = new ClientService(clientRepository);
const clientController = new ClientController(clientService);

const router = Router();
router.post('/clients', (req, res) => clientController.create(req, res));
router.put('/clients/:id', (req, res) => clientController.update(req, res));
router.delete('/clients/:id', (req, res) => clientController.delete(req, res));
router.get('/clients/:id', (req, res) => clientController.getById(req, res));
router.get('/clients/document/:documentNum', (req, res) => clientController.getClientByDocument(req, res));
router.get('/clients', (req, res) => clientController.getAll(req, res));

export default router;
