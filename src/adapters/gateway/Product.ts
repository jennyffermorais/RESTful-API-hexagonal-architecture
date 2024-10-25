import { IProduct } from '../../core/domain/Product';
import { IProductRepository } from '../../core/applications/ports/repositories/IProductRepository';
import { IProductService } from '../../core/applications/ports/services/IProductService';
import { ProductEntity } from '../../core/entities/Product';

export class ProductGateway implements IProductService {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public async create(productData: Partial<ProductEntity>): Promise<ProductEntity> {
    const product = await this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  public async update(id: number, productData: Partial<ProductEntity>): Promise<ProductEntity | null> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      return null;
    }

    Object.assign(product, productData);
    return this.productRepository.save(product);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.productRepository.delete(id);

    return result.affected !== undefined && result.affected! > 0;
  }

  public async getById(id: number): Promise<ProductEntity | null> {
    const product = await this.productRepository.findOneBy({ id });

    return product || null;
  }

  getAll: IProductService['getAll'] = async (payload = {}) => {
    const { category } = payload;
    return this.productRepository.find({ category });
  };
}
