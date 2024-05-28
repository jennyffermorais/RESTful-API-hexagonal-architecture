import { IProduct } from '../../domain/Product';
import { IProductRepository } from '../ports/repositories/IProductRepository';
import { IProductService } from '../ports/services/IProductService';

export class ProductService implements IProductService {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public async create(productData: Partial<IProduct>): Promise<IProduct> {
    const product = await this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  public async update(id: number, productData: Partial<IProduct>): Promise<IProduct | null> {
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

  public async getById(id: number): Promise<IProduct | null> {
    const product = await this.productRepository.findOneBy({ id });

    return product || null;
  }

  getAll: IProductService['getAll'] = async (payload = {}) => {
    const { category } = payload;
    return this.productRepository.find({ category });
  };
}
