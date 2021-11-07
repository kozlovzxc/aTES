// Dotenv should be imported ASAP
import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { AccountService } from './account.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AccountService],
})
export class AccountModule {}
