import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (user && await this.userService.comparePassword(password, user.password)) {
            return {
                userId: user._id,
                username: user.username,
            };
        }
        return null;
    }

    async login(user: any) {
        const payload = { userId: user.userId, iat: new Date().getTime() };
        return this.jwtService.sign(payload);
    }

    async decodeToken(token: string) {
        if (!token)
            return null;
        return this.jwtService.decode(token);
    }
}
