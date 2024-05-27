import { IProduct } from '../../domain/Product';
import { IRepository } from '../ports/IRepository';

export class ProductService {
  private productRepository: IRepository<IProduct>;

  constructor(productRepository: IRepository<IProduct>) {
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

  public async getAll(): Promise<IProduct[]> {
    return this.productRepository.find();
  }
}
