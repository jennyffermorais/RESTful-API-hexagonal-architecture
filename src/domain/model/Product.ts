import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @Column()
   description: string;

   @Column({ type: 'float' })
   price: number;

   @ManyToOne(() => Category)
   category: Category;
}
