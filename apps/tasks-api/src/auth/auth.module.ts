import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RedisModule } from '../common/services/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [],
  providers: [AuthService],
})
export class AuthModule {}
