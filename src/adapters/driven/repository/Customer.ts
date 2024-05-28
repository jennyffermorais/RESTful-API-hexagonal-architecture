import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { ICustomer } from '../../../core/domain/Customer';
import { Order } from './Order';

@Entity()
export class Customer implements ICustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  documentNum: string;

  @Column()
  dateBirthday: string;

  @Column()
  email: string;

  @OneToMany(() => Order, (Order) => Order.customer)
  orders: Relation<Order>;
}
