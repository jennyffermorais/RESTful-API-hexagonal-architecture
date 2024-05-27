import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IOrderProduct } from '../../../core/domain/OrderProduct';
import { Category } from './Category';
import { Order } from './Order';

@Entity()
export class OrderProduct extends BaseEntity implements IOrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;
  @ManyToOne(() => Order, (Order) => Order.products)
  order: Order;

  @Column()
  categoryId: number;
  @OneToOne(() => Category)
  @JoinColumn()
  category: Category;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unitPrice: number;
}
