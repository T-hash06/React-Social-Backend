import { Body, Controller, Delete, Get, HttpException, Param, Post } from '@nestjs/common';
import { UserModel } from './users.model';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
	constructor(private userService: UsersService) {}

	@Get()
	async findAll(): Promise<UserInterface[]> {
		return await this.userService.findAll();
	}

	@Get('/:username')
	async findOne(@Param('username') username: string): Promise<UserInterface | null> {
		const response = await this.userService.findOne(username);

		if (response.error !== undefined) {
			throw new HttpException(response.error, response.statusCode);
		}

		return response.data;
	}

	@Post()
	async createOne(@Body() user: UserModel): Promise<null> {
		const response = await this.userService.createOne(user);

		if (response.error !== undefined) {
			throw new HttpException(response.error, response.statusCode);
		}

		return null;
	}

	@Delete('/:username')
	async deleteOne(@Param('username') username: string): Promise<null> {
		const response = await this.userService.deleteOne(username);

		if (response.error !== undefined) {
			throw new HttpException(response.error, response.statusCode);
		}

		return null;
	}
}
