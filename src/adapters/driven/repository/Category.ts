import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { CATEGORIES, ICategory } from '../../../core/domain/Category';
import { Product } from './Product';

@Entity()
export class Category implements ICategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: CATEGORIES,
  })
  name: CATEGORIES;

  @OneToOne(() => Product, (Product) => Product.category)
  product: Relation<Product>;
}
