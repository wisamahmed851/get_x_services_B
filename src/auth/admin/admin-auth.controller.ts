import { Body, Controller, Post } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './dtos/admin-login.dto';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @Post('login')
  async login(@Body() body: AdminLoginDto){
    const admin = await this.adminAuthService.validateEmail(body.email, body.password );
    return this.adminAuthService.login(admin);
  }
}
