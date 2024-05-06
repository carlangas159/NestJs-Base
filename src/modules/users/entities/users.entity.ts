import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Empresa} from '../../../empresas/entities/empresa.entity';
import {Exclude} from 'class-transformer';

export enum userType {
	guess,
	admin,
	director,
	employee,
	client,
	visitor,
}

@Entity('users')
export class Users extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	created_at: Date;
	@Column({nullable: true})
	deleted_at: Date | null;
	@Column({unique: true})
	email: string;
	@Column({nullable: true})
	email_verified_at: Date | null;
	@Column()
	name: string;
	@Column()
	password: string;
	@Column({nullable: true})
	remember_token: string | null;
	@Column({
		enum: userType,
	})
	type: number | null;
	@Column()
	updated_at: Date | null;
	@Column()
	activo: boolean;

	@Column({nullable: true})
	empresa_id: number | null;

	@Column({nullable: true})
	size: number | null;
	@Column({nullable: true})
	avatar: string | null;
	@Column({nullable: true})
	file: string | null;
	@Column({nullable: true})
	mime: string | null;
	@Column({nullable: true})
	empleados_id: number | null;
	@Column({nullable: true})
	cargos_id: number | null;

	@OneToMany((type) => Empresa, (emrpesa) => emrpesa.users)
	@Exclude({toPlainOnly: true})
	empresa: Promise<Empresa>;
}

/*

empleados_id	bigint
cargos_id	bigint
*/