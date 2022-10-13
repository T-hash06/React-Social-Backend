import { Body, Controller, Get, HttpException, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth.guard';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';
import { Session } from './session.decorator';

@Controller('/auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	getSessionData(@Session() session: SessionData): SessionData | null {
		const userData = session;

		return userData;
	}

	@Post()
	async createSession(@Body() authQuery: AuthModel): Promise<string | null> {
		const response = await this.authService.createSession(authQuery);

		if (response.error !== undefined) {
			throw new HttpException(response.error, response.statusCode);
		}

		return response.data;
	}
}
