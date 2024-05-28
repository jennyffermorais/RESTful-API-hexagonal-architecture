export enum CATEGORIES {
  LANCHE = 'LANCHE',
  ACOMPANHAMENTO = 'ACOMPANHAMENTO',
  BEBIDA = 'BEBIDA',
  SOBREMESA = 'SOBREMESA',
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: CATEGORIES;
}
