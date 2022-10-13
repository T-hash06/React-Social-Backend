import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/database/database.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
	controllers: [AuthController],
	imports: [JwtModule.register(jwtConstants)],
	providers: [AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}
