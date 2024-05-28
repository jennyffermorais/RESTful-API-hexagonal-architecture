import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CATEGORIES, IProduct } from '../../../core/domain/Product';
import { OrderProduct } from './OrderProduct';

@Entity()
export class Product implements IProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column({
    type: 'enum',
    enum: CATEGORIES,
  })
  category: CATEGORIES;

  @OneToMany(() => OrderProduct, (OrderProduct) => OrderProduct.product)
  OrderProducts: OrderProduct[];
}
