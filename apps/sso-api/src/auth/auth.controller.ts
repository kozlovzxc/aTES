import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsString, MinLength } from 'class-validator';
import { AccountService } from './account.service';

class SignUpDTO {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private accountService: AccountService,
  ) {}

  @Post('refresh-token')
  refreshToken() {}

  @Post('sign-in')
  signIn() {}

  @Post('sign-up')
  signUp(@Body() body: SignUpDTO) {
    return this.accountService.create(body);
  }

  @Post('log-out')
  logOut() {}
}
