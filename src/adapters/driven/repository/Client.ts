import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IClient } from '../../../core/domain/Client';
import { Order } from './Order';

@Entity()
export class Client implements IClient {
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

  @OneToMany(() => Order, (Order) => Order.client)
  orders: Relation<Order>;
}
