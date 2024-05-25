import { Product } from "./Product";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Category {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @OneToMany(() => Product, product => product.category)
   products: Product[];
}
