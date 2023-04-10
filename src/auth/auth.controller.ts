import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req, @Res({passthrough: true}) res: Response) {
        const user = req.user;
        const token = await this.authService.login(user);
        res.cookie('auth-token', token, { httpOnly: true });
        return {
            username: user.username,
        };
    }

}
