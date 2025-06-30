import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dtos/Auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    async login(@Body() body: LoginDto){
        const user = await this.authService.validateUser(body.email, body.password);
        return this.authService.login(user);
    }
}
