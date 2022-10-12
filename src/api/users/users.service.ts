import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';
import { hash } from 'bcrypt';

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
			const findByEmail = await this.prismaService.user.findUnique({
				where: { email: user.email },
			});

			const findByUsername = await this.prismaService.user.findUnique({
				where: { username: user.username },
			});

			const errors = [
				...(findByEmail !== null ? ['email'] : []),
				...(findByUsername !== null ? ['username'] : []),
			];

			if (errors.length !== 0) {
				return { statusCode: HttpStatus.CONFLICT, error: errors, data: null };
			}

			const hashedPassword = await hash(user.password, 8);

			await this.prismaService.user.create({ data: { ...user, password: hashedPassword } });
		} catch (error) {
			throw error;
		}

		return { statusCode: HttpStatus.CREATED, data: null };
	}

	async deleteOne(username: string): Promise<ServiceResponse<null>> {
		try {
			const existsByUsername = await this.prismaService.user.findUnique({
				where: { username },
			});

			if (existsByUsername === null) {
				return {
					statusCode: HttpStatus.NOT_FOUND,
					data: null,
					error: `User '${username}' not found`,
				};
			}

			await this.prismaService.user.delete({ where: { username } });
		} catch (error) {
			throw error;
		}

		return { statusCode: HttpStatus.OK, data: null };
	}
}
