import { Controller, Get, Patch } from '@nestjs/common';

@Controller('account')
export class AccountController {
  constructor() {}

  @Get('current')
  getCurrent() {}

  @Patch('current')
  updateCurrent() {}
}
