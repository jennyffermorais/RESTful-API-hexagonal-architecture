import { CATEGORIES } from '../../../../../core/domain/Category';

export class CreateCategoryDto {
  name: CATEGORIES;
}

export class UpdateCategoryDto {
  name?: CATEGORIES;
}
