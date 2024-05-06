import {Users, userType} from '../entities/users.entity';
import {IsBoolean, IsDate, IsEmail, IsEnum, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateUsersDto extends Users {
	@IsBoolean()
	activo: boolean = true;
	created_at: Date;
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
	/*
   // id: number;
   created_at: Date;
   updated_at: Date;
   deleted_at: Date;
   remember_token: string;
   name: string;
   email: string;
   email_verified_at: Date;
   password: string;
   activo: boolean;
   type: number;*/
}