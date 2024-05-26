import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  BaseEntity,
} from "typeorm";
import { Order } from "./Order";
import { Category } from "./Category";

@Entity()
export class OrderProduct extends BaseEntity {
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
}
