import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IProduct } from '../../../core/domain/Product';
import { Category } from './Category';

@Entity('product')
export class Product implements IProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  categoryId: number;
  @OneToOne(() => Category)
  @JoinColumn()
  category: Category;
}
