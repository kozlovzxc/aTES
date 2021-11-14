import { Controller, Post } from '@nestjs/common';
import { Connection } from 'typeorm';

// TODO: disable controller for prod environment
@Controller('e2e')
export class E2EController {
  constructor(private connection: Connection) {}

  @Post('reset')
  reset() {
    return this.connection.synchronize(true);
  }
}
