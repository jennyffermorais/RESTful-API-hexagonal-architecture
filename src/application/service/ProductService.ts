import { AppDataSource } from '../../../data-source';
import { Product } from '../../domain/model/Product';

export class ProductService {
   private productRepository = AppDataSource.getRepository(Product);

   public async createProduct(productData: Partial<Product>): Promise<Product> {
      const product = this.productRepository.create(productData);
      return this.productRepository.save(product);
   }

   public async updateProduct(
      id: number,
      productData: Partial<Product>
   ): Promise<Product | null> {
      const product = await this.productRepository.findOneBy({ id });

      if (!product) {
         return null;
      }

      Object.assign(product, productData);
      return this.productRepository.save(product);
   }

   public async deleteProduct(id: number): Promise<boolean> {
      const result = await this.productRepository.delete(id);

      return result.affected !== undefined && result.affected! > 0;
   }

   public async getProductById(id: number): Promise<Product | null> {
      const product = await this.productRepository.findOneBy({ id });

      return product || null;
   }

   public async getAllProducts(): Promise<Product[]> {
      return this.productRepository.find();
   }
}
