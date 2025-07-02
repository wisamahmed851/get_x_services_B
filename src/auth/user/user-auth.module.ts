import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserJwtStrategy } from './user-jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // ✅ THIS LINE IS REQUIRED
    JwtModule.register({
      secret: 'user-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, UserJwtStrategy],
  exports: [UserAuthService],
})
export class UserAuthModule {}
