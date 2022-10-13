import { IsNotEmpty } from 'class-validator';

export class AuthModel implements AuthQueryInterface {
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	password: string;
}
