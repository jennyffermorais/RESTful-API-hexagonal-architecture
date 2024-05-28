export enum CATEGORIES {
  LANCHE = 'LANCHE',
  ACOMPANHAMENTO = 'ACOMPANHAMENTO',
  BEBIDA = 'BEBIDA',
  SOBREMESA = 'SOBREMESA',
}

export interface ICategory {
  categoryId: number;
  name: CATEGORIES;
}
