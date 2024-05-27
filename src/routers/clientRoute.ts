import express, { Router } from 'express';
import { ClientController } from '../adapters/driver/api/controller/ClientController';
import { TypeORMRepository } from '../adapters/driver/api/repository/TypeORMRepository';
import { Client } from '../adapters/driven/repository/Client';
import { AppDataSource } from '../data-source';
import { ClientService } from '../core/applications/services/ClientService';
import { IClientService } from '../core/applications/ports/IClientService';

const clientRepository = new TypeORMRepository<Client>(AppDataSource, Client);
const clientService: IClientService = new ClientService(clientRepository);

const clientController = new ClientController(clientService);

const router = Router();

router.use(express.json());

router.post('/clients', (req, res) => clientController.create(req, res));
router.put('/clients/:id', (req, res) => clientController.update(req, res));
router.delete('/clients/:id', (req, res) => clientController.delete(req, res));
router.get('/clients/:id', (req, res) => clientController.getById(req, res));
router.get('/clients/document/:documentNum', (req, res) => clientController.getClientByDocument(req, res));
router.get('/clients', (req, res) => clientController.getAll(req, res));

// module.exports = router;

export default router;
