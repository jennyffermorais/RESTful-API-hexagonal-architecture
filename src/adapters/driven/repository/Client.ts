import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IClient } from '../../../core/domain/Client';

@Entity()
export class Client implements IClient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  documentNum: string;

  @Column()
  dateBirthday: string;

  @Column()
  email: string;
}
