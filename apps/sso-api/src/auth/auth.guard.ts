import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  createParamDecorator,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { JWTService } from './jwt.service';

const prefixLength = 'Bearer '.length;

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private jwtService: JWTService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorizationHeader: string | undefined =
      request.headers['Authorization'];
    const accessToken = authorizationHeader?.slice(prefixLength);
    if (accessToken == null) {
      throw new HttpException(
        'Access token is malformed',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { id } = await this.jwtService.verifyAccessToken(accessToken);
    const user = await this.accountService.getOne({ id });
    if (user == null) {
      throw new HttpException(
        'Access token is invalid',
        HttpStatus.UNAUTHORIZED,
      );
    }
    request.user = user;

    return true;
  }
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
