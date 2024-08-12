import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import env from 'src/helpers/env';

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const user = await this.jwtService.verifyAsync(token, { secret: env('JWT_SECRET') });

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    const [bearer, token] = request.headers.authorization?.split(' ') ?? [];

    return bearer === 'Bearer' ? token : null;
  }
}

export default AuthGuard;
