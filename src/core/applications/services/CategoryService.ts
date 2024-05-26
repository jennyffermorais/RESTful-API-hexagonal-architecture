import { Category } from '../../../adapters/driven/repository/Category';
import { AppDataSource } from '../../../data-source';

export class CategoryService {
  private categoryRepository = AppDataSource.getRepository(Category);

  public async createCategory(categoryData: Partial<Category>): Promise<Category> {
    const category = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(category);
  }

  public async updateCategory(id: number, categoryData: Partial<Category>): Promise<Category | null> {
    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      return null;
    }

    Object.assign(category, categoryData);
    return this.categoryRepository.save(category);
  }

  public async deleteCategory(id: number): Promise<boolean> {
    const result = await this.categoryRepository.delete(id);

    return result.affected !== undefined && result.affected! > 0;
  }

  public async getCategoryById(id: number): Promise<Category | null> {
    const category = await this.categoryRepository.findOneBy({ id });

    return category || null;
  }

  public async getAllCategorys(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
