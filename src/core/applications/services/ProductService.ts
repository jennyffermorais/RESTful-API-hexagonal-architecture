import { Product } from '../../../adapters/driven/repository/Product';
import { IRepository } from '../ports/IRepository';

export class ProductService {
  
  private productRepository: IRepository<Product>;

  constructor(productRepository: IRepository<Product>) {
    this.productRepository = productRepository;
  }

  public async create(productData: Partial<Product>): Promise<Product> {
    const product = await this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  public async update(id: number, productData: Partial<Product>): Promise<Product | null> {
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

  public async getById(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({ id });

    return product || null;
  }

  public async getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }
}
