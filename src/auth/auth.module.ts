import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Users} from '../modules/users/entities/users.entity';
import {UsersRepository} from '../modules/users/users.repository';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './jwt.strategy';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
	imports: [
		ConfigModule,
		PassportModule.register({defaultStrategy: 'jwt'}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (conf: ConfigService) => ({
				secret: conf.get('APP_KEY'),
				signOptions: {
					expiresIn: 3600,
				},
			}),
		}),
		TypeOrmModule.forFeature([Users]),
	],
	controllers: [AuthController],
	providers: [UsersRepository, AuthService, JwtStrategy],
	exports: [JwtStrategy, PassportModule],
})
export class AuthModule {
}