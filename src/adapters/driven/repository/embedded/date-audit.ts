import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class DateAudit {
  @CreateDateColumn({ name: 'createdAt', update: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', update: false })
  updatedAt: Date;
}
