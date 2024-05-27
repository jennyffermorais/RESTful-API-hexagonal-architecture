import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './Category';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @OneToOne(() => Category)
  @JoinColumn()
  category: Partial<Category>;
}
