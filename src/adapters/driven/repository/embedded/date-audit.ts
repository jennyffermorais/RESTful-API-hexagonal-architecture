import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class DateAudit {
  @CreateDateColumn({ name: 'created_at', update: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', update: false })
  updatedAt: Date;
}
