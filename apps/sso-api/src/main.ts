import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use((_req, res, next) => {
    res.removeHeader('x-powered-by')
    next()
  })

  app.enableCors({
    origin: ['http://localhost:1234'],
  })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

  await app.listen(3000)
}
bootstrap()
