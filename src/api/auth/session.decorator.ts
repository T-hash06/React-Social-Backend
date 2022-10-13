import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Session = createParamDecorator((_, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	const session = request.user;

	return session;
});
