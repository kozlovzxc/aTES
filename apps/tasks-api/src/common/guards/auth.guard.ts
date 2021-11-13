import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RedisService } from '../services/redis.service';

const prefixLength = 'Bearer '.length;

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private redisService: RedisService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader: string | undefined =
      request.headers['authorization'];
    const accessToken = authorizationHeader?.slice(prefixLength);
    if (!accessToken) {
      return false;
    }
    const publicId = this.redisService.client.GET(accessToken);
    return publicId != null;
  }
}
