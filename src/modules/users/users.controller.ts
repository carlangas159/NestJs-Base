import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import {UsersService} from './users.service';
import {Users} from './entities/users.entity';
import {CreateUsersDto} from './dto/create-user.dto';
import {GetUsersDto} from './dto/get-user.dto';
import {AuthGuard} from '@nestjs/passport';

@Controller('admin/users')
@UseGuards(AuthGuard())
export class UsersController {
	constructor(private readonly usersService: UsersService) {
	}

	@Post()
	async create(@Body() user: CreateUsersDto): Promise<Users> {
		return this.usersService.create(user);
	}

	@Get()
	findAll(@Query() filterDto: GetUsersDto): Promise<Users[]> {
		return this.usersService.findAll(filterDto);
	}

	@Get('/:id')
	findById(@Param('id') id: number): Promise<Users> {
		return this.usersService.findById(id);
	}

	@Delete('/:id')
	deleteBtId(@Param('id') id: number): Promise<void> {
		return this.usersService.deleteById(id);
	}
}