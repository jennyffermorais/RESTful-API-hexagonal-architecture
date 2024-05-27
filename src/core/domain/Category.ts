export enum CATEGORIES {
  LANCHE = 'LANCHE',
  ACOMPANHAMENTO = 'ACOMPANHAMENTO',
  BEBIDA = 'BEBIDA',
  SOBREMESA = 'SOBREMESA',
}

export interface ICategory {
  id: number;
  name: CATEGORIES;
}
