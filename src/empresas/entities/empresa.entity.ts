import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Users} from '../../modules/users/entities/users.entity';
import {Exclude} from 'class-transformer';

@Entity('empresas')
export class Empresa extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;
	@Column({nullable: true})
	created_at: Date;
	@Column({nullable: true})
	updated_at: Date | null;
	@Column({nullable: true})
	deleted_at: Date | null;

	@Column() codigo: string;
	@Column() nombre: string;
	@Column()
	activo: boolean;
	@Column({nullable: true})
	created_by: number | null;
	@Column({nullable: true})
	updated_by: number | null;
	@Column({nullable: true})
	deleted_by: number | null;

	@ManyToOne((type) => Users, (user) => user.empresa_id)
	@Exclude({toPlainOnly: true})
	users: Promise<Users[]>;
}