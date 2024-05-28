import { ICategory } from '../../domain/Category';
import { IRepository } from '../ports/IRepository';

export class CategoryService {
  private categoryRepository: IRepository<ICategory>;

  constructor(categoryRepository: IRepository<ICategory>) {
    this.categoryRepository = categoryRepository;
  }

  public async create(categoryData: Partial<ICategory>): Promise<ICategory> {
    const category = await this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(category);
  }

  public async update(id: number, categoryData: Partial<ICategory>): Promise<ICategory | null> {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      return null;
    }

    Object.assign(category, categoryData);
    return this.categoryRepository.save(category);
  }

  public async delete(id: number): Promise<boolean> {
    const result = await this.categoryRepository.delete(id);

    return result.affected !== undefined && result.affected! > 0;
  }

  public async getById(id: number): Promise<ICategory | null> {
    const category = await this.categoryRepository.findOneBy({ id });

    return category || null;
  }

  public async getAll(): Promise<ICategory[]> {
    return this.categoryRepository.find();
  }
}
