import { Category } from "../../../../domain/model/Category";

export class CreateProductDto {
   name: string;
   description: string;
   price: number;
   category: Category
}

export class UpdateProductDto {
   name?: string;
   description?: string;
   price?: number;
   category?: Category;
}
