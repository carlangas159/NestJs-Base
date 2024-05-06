import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {Users} from '../../modules/users/entities/users.entity';

export const GetUserDecorator = createParamDecorator((data, ctx: ExecutionContext): Users => {
	const req = ctx.switchToHttp().getRequest();
	return req.user;
});