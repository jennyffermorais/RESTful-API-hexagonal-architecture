import express from 'express';
import { CategoryController } from '../controller/CategoryController';

import { Router } from 'express';

const categoryController = new CategoryController();

const router = Router();

router.use(express.json());

router.post('/categorys', (req, res) =>
   categoryController.createCategory(req, res)
);
router.put('/categorys/:id', (req, res) =>
   categoryController.updateCategory(req, res)
);
router.delete('/categorys/:id', (req, res) =>
   categoryController.deleteCategory(req, res)
);
router.get('/categorys/:id', (req, res) =>
   categoryController.getCategoryById(req, res)
);
router.get('/categorys', (req, res) =>
   categoryController.getAllCategorys(req, res)
);

export default router;
