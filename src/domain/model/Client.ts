import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Client {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @Column('text')
   documentNum: string;

   @Column('text')
   dateBirthday: string;

   @Column()
   email: string;
}
