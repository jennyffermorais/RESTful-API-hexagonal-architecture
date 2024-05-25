import { Request, Response } from 'express';
import { ProductService } from '../../../../application/service/ProductService';
import { CreateProductDto, UpdateProductDto } from '../dto/ProductDto';
import { CategoryService } from '../../../../application/service/CategoryService';

export class ProductController {
   private productService = new ProductService();
   private categoryService = new CategoryService();

   async createProduct(req: Request, res: Response): Promise<Response> {
      const { idCategory } = req.body;
      const category = await this.categoryService.getCategoryById(idCategory);
      if (category) {
         const createProductDto: CreateProductDto = req.body;
         const product = await this.productService.createProduct(
            createProductDto
         );
         return res.status(201).json(product);
      } else {
         return res.status(404).json({ message: 'Category not found' });
      }
   }

   async updateProduct(req: Request, res: Response): Promise<Response> {
      const id = parseInt(req.params.id, 10);
      const updateProductDto: UpdateProductDto = req.body;
      const product = await this.productService.updateProduct(
         id,
         updateProductDto
      );
      if (product) {
         return res.json(product);
      } else {
         return res.status(404).json({ message: 'Product not found' });
      }
   }

   async deleteProduct(req: Request, res: Response): Promise<Response> {
      const id = parseInt(req.params.id, 10);
      await this.productService.deleteProduct(id);
      return res.status(204).send();
   }

   async getProductById(req: Request, res: Response): Promise<Response> {
      const id = parseInt(req.params.id, 10);
      const product = await this.productService.getProductById(id);
      if (product) {
         return res.json(product);
      } else {
         return res.status(404).json({ message: 'Product not found' });
      }
   }

   async getAllProducts(req: Request, res: Response): Promise<Response> {
      const products = await this.productService.getAllProducts();
      return res.json(products);
   }
}
