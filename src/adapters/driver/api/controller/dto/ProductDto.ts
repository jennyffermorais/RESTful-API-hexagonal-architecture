import { CATEGORIES } from '../../../../../core/domain/Product';

export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  category: CATEGORIES;
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  category?: CATEGORIES;
}
