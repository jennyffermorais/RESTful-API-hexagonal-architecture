import { Request, Response } from 'express';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/CategoryDto';
import { ICategoryService } from '../../../../core/applications/ports/ICategoryService';

export class CategoryController {

  private categoryService: ICategoryService;

  constructor(categoryService: ICategoryService) {
    this.categoryService = categoryService;
  }

  async createCategory(req: Request, res: Response): Promise<Response> {
    const createCategoryDto: CreateCategoryDto = req.body;
    const category = await this.categoryService.create(createCategoryDto);
    return res.status(201).json(category);
  }

  async updateCategory(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const updateCategoryDto: UpdateCategoryDto = req.body;
    const category = await this.categoryService.update(id, updateCategoryDto);
    if (category) {
      return res.json(category);
    } else {
      return res.status(404).json({ message: 'Category not found' });
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    await this.categoryService.delete(id);
    return res.status(204).send();
  }

  async getCategoryById(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const category = await this.categoryService.getById(id);
    if (category) {
      return res.json(category);
    } else {
      return res.status(404).json({ message: 'Category not found' });
    }
  }

  async getAllCategorys(req: Request, res: Response): Promise<Response> {
    const categorys = await this.categoryService.getAll();
    return res.json(categorys);
  }
}
