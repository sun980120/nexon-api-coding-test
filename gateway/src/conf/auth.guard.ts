// gateway/src/auth/auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ResponseTokenDto } from '../auth/dtos/response.token.dto';
import { Request } from 'express'; // Express의 Request 타입 임포트

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AUTH_SERVER') private authServiceClient: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) return false;
    try {
      const user: ResponseTokenDto | null = await lastValueFrom(
        this.authServiceClient.send({ cmd: 'validate-token' }, token),
      );
      if (!user) return false;
      request.user = user;

      return true;
    } catch {
      return false;
    }
  }
  private extractToken(request: Request): string | null {
    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader) return null;

    const [type, token] = authorizationHeader.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
