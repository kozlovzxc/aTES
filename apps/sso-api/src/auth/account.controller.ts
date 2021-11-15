import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';

@Controller('account')
export class AccountController {
  @Get('current')
  getCurrent() {
    throw new HttpException(
      'Not implemented',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Patch('current')
  updateCurrent() {
    throw new HttpException(
      'Not implemented',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
