import { UserService } from './../../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class VerifyRoles implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles = await this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || roles.length === 0) return false;
    const req: Request = context.switchToHttp().getRequest();
    const [type, token] = req.headers.authorization?.split(' ') ?? [];

    if (token && type === 'Bearer') {
      const payload = await this.jwtService
        .verifyAsync(token, {
          secret: this.config.get<string>('JWT_SECRET'),
        })
        .catch((err) => {
          throw new UnauthorizedException('access denied, invalid token');
        });

      const user = await this.userService.findOne({ _id: payload._id });
      if (!user)
        throw new UnauthorizedException('access denied, forbidden resource.');

      if (roles.includes(user.roles)) {
        req['user'] = payload;
        return true;
      }
      throw new UnauthorizedException('access denied, forbidden resource.');
    } else {
      throw new UnauthorizedException('access denied, no token provided');
    }
  }
}
