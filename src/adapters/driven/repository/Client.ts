import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IClient } from '../../../core/domain/Client';

@Entity('client')
export class Client implements IClient {
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
