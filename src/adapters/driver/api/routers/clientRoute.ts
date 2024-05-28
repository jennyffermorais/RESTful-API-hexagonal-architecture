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

const router = express.Router();
router.post('/clients', async (req, res) => {
  try {
    const result = await clientController.create(req.body, res.status.bind(res, 404), res.status.bind(res, 500));
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/clients/:id', async (req, res) => {
  try {
    const result = await clientController.update(
      req.params.id,
      req.body,
      res.status.bind(res, 404),
      res.status.bind(res, 500)
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/clients/:id', async (req, res) => {
  try {
    await clientController.delete(req.params.id, res.status.bind(res, 404), res.status.bind(res, 500));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/clients/:id', async (req, res) => {
  try {
    const result = await clientController.getById(
      req.params.id,
      res.status.bind(res, 404),
      res.status.bind(res, 500)
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/clients', async (req, res) => {
  try {
    const result = await clientController.getAll(res.status.bind(res, 500));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/clients/document/:documentNum', async (req, res) => {
    try {
      const result = await clientController.getById(
        req.params.documentNum,
        res.status.bind(res, 404),
        res.status.bind(res, 500)
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });


export default router;
