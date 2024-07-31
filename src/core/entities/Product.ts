export enum CATEGORIES {
  LANCHE = 'LANCHE',
  ACOMPANHAMENTO = 'ACOMPANHAMENTO',
  BEBIDA = 'BEBIDA',
  SOBREMESA = 'SOBREMESA',
}

export class ProductEntity {
  id: number;
  name: string;
  description: string;
  price: number;
  category: CATEGORIES;

  constructor(id: number, name: string, description: string, price: number, category: CATEGORIES) {
    (this.id = id),
      (this.name = name),
      (this.description = description),
      (this.price = price),
      (this.category = category);
  }
}
