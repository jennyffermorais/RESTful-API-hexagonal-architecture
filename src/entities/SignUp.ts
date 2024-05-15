import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('registers')
export class SignUp {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: 'text' })
	name: string

	@Column({ type: 'text', nullable: true })
	document: string

	@Column({ type: 'text', nullable: true })
	date_birthday: string

	@Column({ type: 'text', nullable: true })
	email: string
}