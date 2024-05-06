import {IsEmail, IsString, Matches, MaxLength, MinLength} from 'class-validator';

export class AuthCredentialsDto {
	@IsEmail()
	@MinLength(8)
	@MaxLength(50)
	email: string;

	@IsString()
	@MinLength(8)
	@MaxLength(50)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password is too weak'})
	password: string;
}