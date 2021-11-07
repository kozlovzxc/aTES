import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { JWTService } from './jwt.service';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { AccountEntity } from './account.entity';
import { PublisherService } from '../common/publisher.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  controllers: [AuthController, AccountController],
  providers: [JWTService, AccountService, PublisherService],
})
export class AuthModule {}
