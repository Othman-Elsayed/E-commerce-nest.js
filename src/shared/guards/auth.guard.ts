import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';

// Roles & Auth
@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.logger.warn('No token provided in request');
      throw new UnauthorizedException('Authorization token is required');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow<string>('JWT_SECRET'),
      });

      // Attach user payload to the request
      request['user'] = payload;

      // Check roles if required
      return this.checkRoles(context, payload.roles);
    } catch (error) {
      this.logger.error(`Token validation failed: ${error.message}`);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    return type?.toLowerCase() === 'bearer' ? token : undefined;
  }

  private checkRoles(context: ExecutionContext, userRoles: string[]): boolean {
    // Get required roles from the handler or class using Reflector
    const requiredRoles =
      this.reflector.get<string[]>('roles', context.getHandler()) ||
      this.reflector.get<string[]>('roles', context.getClass()) ||
      [];

    if (requiredRoles.length === 0) {
      // No roles required, access granted
      return true;
    }

    // Check if user has at least one of the required roles
    const hasRequiredRole = requiredRoles.some((role) =>
      userRoles?.includes(role),
    );

    if (!hasRequiredRole) {
      this.logger.warn(
        `User with roles ${userRoles} attempted to access route requiring ${requiredRoles}`,
      );
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
