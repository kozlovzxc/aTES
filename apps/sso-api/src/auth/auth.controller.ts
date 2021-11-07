import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { JWTService } from './jwt.service';
import { IsString, MinLength } from 'class-validator';
import { AccountService } from './account.service';

class SignUpDTO {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}

class SignInDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JWTService,
    private accountService: AccountService,
  ) {}

  @Post('refresh-token')
  refreshToken() {}

  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() body: SignInDTO) {
    const user = await this.accountService.getOne({
      username: body.username,
      password: body.password,
    });
    if (user == null) {
      throw new HttpException("User wasn't not found", HttpStatus.NOT_FOUND);
    }
    const accessToken = this.jwtService.generateAccessToken(user);
    return { accessToken };
  }

  @Post('sign-up')
  async signUp(@Body() body: SignUpDTO) {
    const newUser = await this.accountService.create(body);
    const accessToken = this.jwtService.generateAccessToken(newUser);
    return { accessToken };
  }

  // TODO: invalidate refresh token
  @Post('log-out')
  logOut() {}
}
