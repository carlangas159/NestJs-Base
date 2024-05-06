import {Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateAuthDto} from './dto/create-auth.dto';
import {UpdateAuthDto} from './dto/update-auth.dto';
import {UsersRepository} from '../modules/users/users.repository';
import {CreateUsersDto} from '../modules/users/dto/create-user.dto';
import {Users} from '../modules/users/entities/users.entity';
import {AuthCredentialsDto} from './dto/AuthCredentials.dto';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {JwtPayloadInterface} from './jwt-payload.interface';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private jwtService: JwtService,
	) {
	}

	async singIn(usersDto: CreateUsersDto): Promise<Users> {
		return this.usersRepository.createUser(usersDto);
	}

	async singUp(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
		const {email, password} = authCredentialsDto;
		const user = await this.usersRepository.getUserByEmailToLogin(email);
		if (user && (await bcrypt.compare(password, user.password))) {
			const payload: JwtPayloadInterface = {email};
			const accessToken: string = await this.jwtService.sign(payload);

			return {accessToken};
		}
		throw new UnauthorizedException('Credecniales invalidads');
	}

	create(createAuthDto: CreateAuthDto) {
		return 'This action adds a new auth';
	}

	findAll() {
		return `This action returns all auth`;
	}

	findOne(id: number) {
		return `This action returns a #${id} auth`;
	}

	update(id: number, updateAuthDto: UpdateAuthDto) {
		return `This action updates a #${id} auth`;
	}

	remove(id: number) {
		return `This action removes a #${id} auth`;
	}
}