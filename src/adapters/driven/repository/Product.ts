import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  category: string;
}
