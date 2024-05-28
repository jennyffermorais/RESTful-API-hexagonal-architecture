import express from 'express';
import { CustomerService } from '../../../../core/applications/services/CustomerService';
import { AppDataSource } from '../../../../data-source';
import { Customer } from '../../../driven/repository/Customer';
import { CustomerController } from '../controller/CustomerController';
import { TypeORMRepository } from '../repository/TypeORMRepository';

const customerRepository = new TypeORMRepository<Customer>(AppDataSource, Customer);
const customerService = new CustomerService(customerRepository);
const customerController = new CustomerController(customerService);

const router = express.Router();
router.post('/customers', async (req, res) => {
  try {
    const result = await customerController.create(req.body, res.status.bind(res, 404), res.status.bind(res, 500));
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/customers/:id', async (req, res) => {
  try {
    const result = await customerController.update(
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

router.delete('/customers/:id', async (req, res) => {
  try {
    await customerController.delete(req.params.id, res.status.bind(res, 404), res.status.bind(res, 500));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/customers/:id', async (req, res) => {
  try {
    const result = await customerController.getById(
      req.params.id,
      res.status.bind(res, 404),
      res.status.bind(res, 500)
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/customers', async (req, res) => {
  try {
    const documentNum = req.query.documentNum as string;

    const result = await customerController.getAll(documentNum, res.status.bind(res, 500));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/customers/document/:documentNum', async (req, res) => {
  try {
    const result = await customerController.getById(
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
