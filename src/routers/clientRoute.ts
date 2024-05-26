import express, { Router } from 'express';
import { ClientController } from '../adapters/driver/api/controller/ClientController';

const clientController = new ClientController();

const router = Router();

router.use(express.json());

router.post('/clients', (req, res) => clientController.createClient(req, res));
router.put('/clients/:id', (req, res) => clientController.updateClient(req, res));
router.delete('/clients/:id', (req, res) => clientController.deleteClient(req, res));
router.get('/clients/:id', (req, res) => clientController.getClientById(req, res));
router.get('/clients/document/:documentNum', (req, res) => clientController.getClientByDocument(req, res));
router.get('/clients', (req, res) => clientController.getAllClients(req, res));

// module.exports = router;

export default router;
