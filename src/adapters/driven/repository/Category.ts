import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CATEGORIES, ICategory } from '../../../core/domain/Category';
import { Product } from './Product';

@Entity('category')
export class Category implements ICategory {
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
