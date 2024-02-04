import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

//JwtModule.register({})
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath:'.env',
    }),
    JwtModule.register({
      secret: 'njkmkjmkjnmjnnjknnkkjkn',
      signOptions: { expiresIn: '60s' }, //30d 30 day just tets // 60s
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
