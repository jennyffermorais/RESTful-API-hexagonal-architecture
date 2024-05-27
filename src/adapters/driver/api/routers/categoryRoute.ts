import express, { Router } from 'express';
import { ICategoryService } from '../../../../core/applications/ports/ICategoryService';
import { CategoryService } from '../../../../core/applications/services/CategoryService';
import { AppDataSource } from '../../../../data-source';
import { Category } from '../../../driven/repository/Category';
import { CategoryController } from '../controller/CategoryController';
import { TypeORMRepository } from '../repository/TypeORMRepository';

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
