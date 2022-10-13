import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post()
	async createSession(@Body() authQuery: AuthModel): Promise<null> {
		const response = await this.authService.createSession(authQuery);

		if (response.error !== undefined) {
			throw new HttpException(response.error, response.statusCode);
		}

		return null;
	}
}
