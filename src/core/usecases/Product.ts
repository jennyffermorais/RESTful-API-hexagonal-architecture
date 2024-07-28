import { ProductGateway } from '../../adapters/gateway/Product';
import { IProductService } from '../../core/applications/ports/services/IProductService';
import { ProductEntity } from '../../core/entities/Product';

export class ProductUseCase {
  private productGateway: ProductGateway;

  constructor(productGateway: ProductGateway) {
    this.productGateway = productGateway;
  }

  public async create(productData: Partial<ProductEntity>): Promise<ProductEntity> {
    try {
      const product = await this.productGateway.create(productData);
      return product;
    } catch (error) {
      throw error;
    }
  }

  public async update(id: number, productData: Partial<ProductEntity>): Promise<ProductEntity | null> {
    try {
      const product = await this.productGateway.update(id, productData);
      return product;
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: number): Promise<boolean> {
    try {
      const product = await this.productGateway.delete(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  public async getById(id: number): Promise<ProductEntity | null> {
    try {
      const product = await this.productGateway.getById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  getAll: IProductService['getAll'] = async (payload = {}) => {
    try {
      const product = await this.productGateway.getAll(payload);
      return product;
    } catch (error) {
      throw error;
    }
  };
}
