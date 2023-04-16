import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

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

    @Post('logout')
    async logout(@Res({passthrough: true}) res: Response) {
        res.clearCookie('auth-token');
        return {
          message: 'Logged out successfully',
        };
    }
}
