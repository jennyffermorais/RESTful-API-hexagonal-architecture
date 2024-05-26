export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  category: string;
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
}
