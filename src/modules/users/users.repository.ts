import {Repository} from 'typeorm';
import {Users} from './entities/users.entity';
import {NotFoundException} from '@nestjs/common';
import {CreateUsersDto} from './dto/create-user.dto';
import {GetUsersDto} from './dto/get-user.dto';
import {InjectRepository} from '@nestjs/typeorm';

export class UsersRepository extends Repository<Users> {
	constructor(
		@InjectRepository(Users)
		private userRepository: Repository<Users>,
	) {
		super(userRepository.target, userRepository.manager, userRepository.queryRunner);
	}

	async createUser(usersDto: CreateUsersDto): Promise<Users> {
		const user = this.create(usersDto);
		await this.save(user);

		return user;
	}

	async getUsers(filterDto: GetUsersDto): Promise<Users[]> {
		const {activo, search} = filterDto;
		const query = this.createQueryBuilder('users');
		if (activo) {
			query.andWhere('users.activo = :activo', {activo: activo});
		}
		if (search) {
			query.andWhere('(LOWER(users.name) LIKE LOWER(:name) OR LOWER(users.email) LIKE LOWER(:name))', {
				name: `%${search}%`,
			});
		}
		const users = await query.getMany();
		return users;
	}

	async getUserById(id: number): Promise<Users> {
		const query = this.createQueryBuilder('users');
		if (id) {
			query.andWhere('users.id = :id', {id: id});
		}

		const users = await query.getOne();
		if (!users) {
			throw new NotFoundException(`El usuario con id ${id} no se encuentra`);
		}
		return users;
	}

	async getUserByEmail(email: string): Promise<Users> {
		const query = this.createQueryBuilder('users');
		if (email) {
			query.andWhere('users.email = :email', {email: email});
		}

		const users = await query.getOne();
		if (!users) {
			throw new NotFoundException(`El usuario con email ${email} no se encuentra`);
		}
		return users;
	}

	async getUserByEmailToLogin(email: string): Promise<Users> {
		const query = this.createQueryBuilder('users');
		if (email) {
			query.andWhere('users.email = :email', {email: email});
		}

		const users = await query.getOne();
		return users;
	}

	async deleteById(id: number): Promise<void> {
		const deleted = await this.delete({id: id});
		if (deleted.affected < 1) {
			throw new NotFoundException(`El usuario con id ${id} no pudo borrarse`);
		}
		return;
	}
}