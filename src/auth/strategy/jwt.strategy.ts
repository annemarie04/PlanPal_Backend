import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
            // console.log(req);
            const data = req?.headers["cookie"];
            const token = data?.split("=")[1];
            if(!token) {
                return null;
            }
            return token;
        }
      ]),

    });
  }

  async validate(req: Request, payload: any) {
    return { userId: payload.userId };
  }
}