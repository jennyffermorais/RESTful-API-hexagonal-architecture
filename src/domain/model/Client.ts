import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  documentNum: string;

  @Column('text')
  dateBirthday: string;

  @Column()
  email: string;
}
