import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product';

export enum CATEGORIES {
  LANCHE,
  ACOMPANHAMENTO,
  BEBIDA,
  SOBREMESA,
}

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: CATEGORIES,
  })
  name: CATEGORIES;

  @OneToOne(() => Product, (Product) => Product.category)
  product: Product;
}
