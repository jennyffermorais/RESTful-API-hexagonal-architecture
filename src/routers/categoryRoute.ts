import express, { Router } from 'express';
import { Category } from '../adapters/driven/repository/Category';
import { AppDataSource } from '../data-source';
import { CategoryService } from '../core/applications/services/CategoryService';
import { ICategoryService } from '../core/applications/ports/ICategoryService';
import { TypeORMRepository } from '../adapters/driver/api/repository/TypeORMRepository';
import { CategoryController } from '../adapters/driver/api/controller/CategoryController';

const categoryRepository = new TypeORMRepository<Category>(AppDataSource, Category);
const categoryService: ICategoryService = new CategoryService(categoryRepository);

const categoryController = new CategoryController(categoryService);

const router = Router();

router.use(express.json());

router.post('/categorys', (req, res) => categoryController.createCategory(req, res));
router.put('/categorys/:id', (req, res) => categoryController.updateCategory(req, res));
router.delete('/categorys/:id', (req, res) => categoryController.deleteCategory(req, res));
router.get('/categorys/:id', (req, res) => categoryController.getCategoryById(req, res));
router.get('/categorys', (req, res) => categoryController.getAllCategorys(req, res));

export default router;
