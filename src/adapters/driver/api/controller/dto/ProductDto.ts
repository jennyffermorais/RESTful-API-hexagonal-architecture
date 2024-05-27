import { CreateCategoryDto, UpdateCategoryDto } from "./CategoryDto";

export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  category: CreateCategoryDto
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  category?: UpdateCategoryDto;
}
