import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserModel implements UserInterface {
	id: string;

	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@MinLength(8)
	password: string;
}
