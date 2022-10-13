import { HttpStatus, Injectable, Post } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

	@Post()
	async createSession(authQuery: AuthQueryInterface): Promise<ServiceResponse<string>> {
		const user = await this.prismaService.user.findUnique({
			where: { username: authQuery.username },
		});

		if (user === null) {
			return {
				statusCode: HttpStatus.NOT_FOUND,
				data: null,
				error: `User '${authQuery.username}' not found`,
			};
		}

		const validPassword = await compare(authQuery.password, user.password);

		if (!validPassword) {
			return {
				statusCode: HttpStatus.UNAUTHORIZED,
				data: null,
				error: `Incorrect Password`,
			};
		}

		const dataResponse = this.jwtService.sign({
			sub: user.id,
			username: user.username,
		});

		return { statusCode: HttpStatus.CREATED, data: dataResponse };
	}
}
