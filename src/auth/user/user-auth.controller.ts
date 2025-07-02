import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from './dtos/user-login.dto';
import { UserAuthService } from './user-auth.service';

@Controller('user-auth')
export class UserAuthController {
    constructor(private authService: UserAuthService){}

    @Post('login')
    async login(@Body() body: UserLoginDto){
        const user = await this.authService.validateUser(body.email, body.password);
        return this.authService.login(user);
    }
}
