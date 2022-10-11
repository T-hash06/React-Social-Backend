import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class UsersService {
	constructor(private prismaService: PrismaService) {}

	async findAll(): Promise<UserInterface[]> {
		const users = await this.prismaService.user.findMany();

		return users;
	}

	async findOne(username: string): Promise<ServiceResponse<UserInterface>> {
		const user = await this.prismaService.user.findUnique({
			where: { username },
		});

		if (user === null) {
			return {
				statusCode: HttpStatus.NOT_FOUND,
				data: null,
				error: `User '${username}' is not found`,
			};
		}

		return { statusCode: HttpStatus.OK, data: user };
	}

	async createOne(user: UserInterface): Promise<ServiceResponse<string>> {
		try {
			await this.prismaService.user.create({ data: user });
		} catch (error) {
			const prismaError = error as PrismaConflictError;

			if (prismaError.code === 'P2002') {
				const field = prismaError.meta.target;

				return {
					statusCode: HttpStatus.CONFLICT,
					data: field,
					error: `Data ${field} already exists`,
				};
			}

			throw error;
		}

		return { statusCode: HttpStatus.CREATED, data: null };
	}

	async deleteOne(username: string): Promise<ServiceResponse<null>> {
		try {
			await this.prismaService.user.delete({ where: { username } });
		} catch (_) {
			return {
				statusCode: HttpStatus.NOT_FOUND,
				data: null,
				error: `User '${username}' not found`,
			};
		}

		return { statusCode: HttpStatus.OK, data: null };
	}
}
