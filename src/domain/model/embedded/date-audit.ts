import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class DateAudit {
  @CreateDateColumn({ name: 'created_at', update: false })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', update: false })
  updated_at: Date;
}
