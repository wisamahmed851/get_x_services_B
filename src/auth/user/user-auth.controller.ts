import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserLoginDto } from './dtos/user-login.dto';
import { UserAuthService } from './user-auth.service';
import { UserJwtAuthGuard } from './user-jwt.guard';

@Controller('user-auth')
export class UserAuthController {
  constructor(private userAuthService: UserAuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() body: UserLoginDto) {
    const user = await this.userAuthService.validateUser(
      body.email,
      body.password,
    );
    return this.userAuthService.login(user);
  }

  @Get('profile')
  @UseGuards(UserJwtAuthGuard)
  profileGet(@Req() req: any) {
    return this.userAuthService.profile(req);
  }

  @Post('change-password')
  @UseGuards(UserJwtAuthGuard)
  changePassword(
    @Body() body: { oldPassword: string; newPassword: string },
    @Req() req: any,
  ) {
    return this.userAuthService.changePassword(body, req);
  }

  @HttpCode(200)
  @Post('logout')
  @UseGuards(UserJwtAuthGuard)
  logout(@Req() req: any) {
    return this.userAuthService.logout(req); // `req.user.id` is available
  }
}
