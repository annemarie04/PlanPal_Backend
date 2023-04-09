import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Req() req) {
    return req.user;
}

}
