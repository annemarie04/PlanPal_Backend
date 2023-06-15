import { Controller, Post, Get, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Request } from 'express';

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
        
        const sevenDaysInSeconds = 7 * 24 * 60 * 60 * 1000;
        const expires = new Date(Date.now() + sevenDaysInSeconds * 1000);

        res.cookie('auth-token', token, {
            maxAge: sevenDaysInSeconds,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
        //console.log("returned username and userId on login:", user.username, user.userId);
        return {
            username: user.username,
            userId: user.userId
        };
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) res: Response) {
        console.log("logout request.")
        res.clearCookie('auth-token');
        return {
          message: 'Logged out successfully',
        };
    }

    @Get('checkauth')
    async checkAuth(@Req() req: Request) {
        //console.log("checking auth...");
        const authToken = req.cookies['auth-token'];
        //console.log(req.cookies['auth-token']);
        const isAuthenticated = !!authToken; // converteste authTokenul la bool (verifica existenta lui)
        /*
        if(isAuthenticated)
            console.log("user is logged in");
        else
            console.log("user not logged in");
        */
        return {
            isAuthenticated,
        };
    }

}
