export interface iUsers {
	id: number;
	created_at: Date;
	updated_at: Date | null;
	deleted_at: Date | null;
	remember_token: string | null;
	name: string;
	email: string;
	email_verified_at: Date | null;
	password: string | null;
	activo: boolean;
	type: number;
}

/*
export class UsersModel implements iUsers {

  @IsBoolean()
  activo: boolean = true;
  created_at: Date = new Date();
  @IsOptional()
  @IsDate()
  deleted_at = null;
  @IsEmail()
  email = null;
  @IsOptional()
  @IsDate()
  email_verified_at = null;
  @IsNumber()
  id = null;
  @IsString()
  name = null;
  password = null;
  remember_token = null;
  @IsEnum(userType)
  type = null;
  @IsOptional()
  @IsDate()
  updated_at = null;
}*/