import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IOrder, PAYMENT_STATUS, PROCESS_STATUS } from '../../../core/domain/Order';
import { Client } from './Client';
import { OrderProduct } from './OrderProduct';
import { DateAudit } from './embedded/date-audit';

@Entity('Order')
export class Order extends BaseEntity implements IOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderProduct, (OrderProduct) => OrderProduct.order)
  products: Relation<OrderProduct[]>;

  @Column({ nullable: true })
  clientId: number;
  @OneToOne(() => Client)
  @JoinColumn()
  client: Relation<Client>;

  @Column({
    type: 'enum',
    enum: PROCESS_STATUS,
    default: PROCESS_STATUS.RECEBIDO,
  })
  processStage: PROCESS_STATUS;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  totalAmount: number;

  @Column({
    type: 'enum',
    enum: PAYMENT_STATUS,
    default: PAYMENT_STATUS.PENDING,
  })
  paymentStatus: PAYMENT_STATUS;

  @Column(() => DateAudit, { prefix: '' })
  date_audit: DateAudit;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
