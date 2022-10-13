import { HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export {};

declare global {
	interface UserInterface {
		id: string;
		name: string;
		username: string;
		email: string;
		password: string;
	}

	interface AuthQueryInterface {
		username: string;
		password: string;
	}

	interface SessionData {
		username: string;
		sub: string;
	}

	interface JwtDecodedData extends SessionData {
		iat: number;
		exp: number;
	}

	interface ServiceResponse<T> {
		statusCode: HttpStatus;
		data: T | null;
		error?: string | string[];
	}

	interface PrismaConflictError extends PrismaClientKnownRequestError {
		meta: { target: string };
	}
}
