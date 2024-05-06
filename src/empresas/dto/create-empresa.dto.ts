import {Users} from '../../modules/users/entities/users.entity';

export class CreateEmpresaDto {
	created_at: Date;
	updated_at: Date | null;
	created_by: number | null;
	updated_by: number | null;
	user: Users;
}