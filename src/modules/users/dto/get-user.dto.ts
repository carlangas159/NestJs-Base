import {IsBoolean, IsOptional, IsString} from 'class-validator';

export class GetUsersDto {
	@IsOptional()
	@IsBoolean()
	activo?: boolean;
	@IsOptional()
	@IsString()
	search?: string;
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