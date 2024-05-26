import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { OrderProduct } from "./OrderProduct";
import { Client } from "./Client";
import { DateAudit } from "./embedded/date-audit";

export enum PROCESS_STATUS {
  RECEBIDO,
  "EM PREPARAÇÃO",
  PRONTO,
  FINALIZADO,
}

@Entity("Order")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderProduct, (OrderProduct) => OrderProduct.order)
  products: OrderProduct[];

  @Column({ nullable: true })
  clientId: number;
  @OneToOne(() => Client)
  @JoinColumn()
  client: Client;

  @Column({
    type: "enum",
    enum: PROCESS_STATUS,
    default: PROCESS_STATUS.RECEBIDO,
  })
  processStage: PROCESS_STATUS;

  @Column(() => DateAudit, { prefix: "" })
  date_audit: DateAudit;
}
