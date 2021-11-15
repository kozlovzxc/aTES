import { Module } from '@nestjs/common'
import { E2EController } from './e2e.controller'

@Module({
  controllers: [E2EController],
})
export class E2EModule {}
