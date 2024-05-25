import { Request, Response } from 'express';
import { CategoryService } from '../../../../application/service/CategoryService';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/CategoryDto';

export class CategoryController {
   private categoryService = new CategoryService();

   async createCategory(req: Request, res: Response): Promise<Response> {
      const createCategoryDto: CreateCategoryDto = req.body;
      const category = await this.categoryService.createCategory(
         createCategoryDto
      );
      return res.status(201).json(category);
   }

   async updateCategory(req: Request, res: Response): Promise<Response> {
      const id = parseInt(req.params.id, 10);
      const updateCategoryDto: UpdateCategoryDto = req.body;
      const category = await this.categoryService.updateCategory(
         id,
         updateCategoryDto
      );
      if (category) {
         return res.json(category);
      } else {
         return res.status(404).json({ message: 'Category not found' });
      }
   }

   async deleteCategory(req: Request, res: Response): Promise<Response> {
      const id = parseInt(req.params.id, 10);
      await this.categoryService.deleteCategory(id);
      return res.status(204).send();
   }

   async getCategoryById(req: Request, res: Response): Promise<Response> {
      const id = parseInt(req.params.id, 10);
      const category = await this.categoryService.getCategoryById(id);
      if (category) {
         return res.json(category);
      } else {
         return res.status(404).json({ message: 'Category not found' });
      }
   }

   async getAllCategorys(req: Request, res: Response): Promise<Response> {
      const categorys = await this.categoryService.getAllCategorys();
      return res.json(categorys);
   }
}
