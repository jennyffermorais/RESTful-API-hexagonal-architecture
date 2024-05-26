import express, { Router } from 'express';
import { CategoryController } from '../adapters/driver/api/controller/CategoryController';

const categoryController = new CategoryController();

const router = Router();

router.use(express.json());

router.post('/categorys', (req, res) => categoryController.createCategory(req, res));
router.put('/categorys/:id', (req, res) => categoryController.updateCategory(req, res));
router.delete('/categorys/:id', (req, res) => categoryController.deleteCategory(req, res));
router.get('/categorys/:id', (req, res) => categoryController.getCategoryById(req, res));
router.get('/categorys', (req, res) => categoryController.getAllCategorys(req, res));

export default router;
