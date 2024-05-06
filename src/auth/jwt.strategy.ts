import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {UsersRepository} from '../modules/users/users.repository';
import {JwtPayloadInterface} from './jwt-payload.interface';
import {Users} from '../modules/users/entities/users.entity';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		// pt: StrategyOptionsWithRequest, verify: VerifyCallbackWithRequest,
		private readonly usersRepository: UsersRepository,
		private configService: ConfigService,
	) {
		// super(opt, verify);
		super({
			secretOrKey: configService.get('APP_KEY'),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
		});
	}

	async validate(payload: JwtPayloadInterface): Promise<Users> {
		const {email} = payload;
		const user = await this.usersRepository.getUserByEmail(email);
		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}