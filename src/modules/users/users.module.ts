import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersRepository} from './users.repository';
import {Users} from './entities/users.entity';
import {AuthModule} from '../../auth/auth.module';

@Module({
	imports: [AuthModule, TypeOrmModule.forFeature([Users])],
	providers: [UsersRepository, UsersService],
	controllers: [UsersController],
})
export class UsersModule {
}