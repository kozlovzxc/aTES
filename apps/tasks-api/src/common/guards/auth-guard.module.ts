import { Module } from '@nestjs/common';
import { RedisModule } from '../services/redis.module';

@Module({
  imports: [RedisModule],
  exports: [RedisModule],
})
export class AuthGuardModule {}
