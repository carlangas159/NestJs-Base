import {Injectable} from '@nestjs/common';
import {Users} from './entities/users.entity';
import {UsersRepository} from './users.repository';
import {CreateUsersDto} from './dto/create-user.dto';
import {GetUsersDto} from './dto/get-user.dto';

@Injectable()
export class UsersService {
	constructor(
		/*    @Inject('USERS_REPOSITORY')
         private readonly usersRepository: Repository<Users>,*/
		private readonly usersRepository: UsersRepository,
	) {
	}

	async findById(id: number): Promise<Users> {
		return this.usersRepository.getUserById(id);
	}

	deleteById(id: number): Promise<void> {
		return this.usersRepository.deleteById(id);
	}

	findAll(filterDto: GetUsersDto): Promise<Users[]> {
		return this.usersRepository.getUsers(filterDto);
	}

	create(user: CreateUsersDto): Promise<Users> {
		return this.usersRepository.createUser(user);
	}

	/*
    findAll() {
      return this.users;
    }*/
}