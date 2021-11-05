import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  beforeEach(async () => {
    return request(app.getHttpServer()).post('/e2e/reset');
  });

  it('Should create user for valid data', () => {
    return request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({
        username: 'test',
        password: '12345678',
      })
      .expect(201)
      .expect(({ body }) => {
        expect(body.username).toEqual('test');
        expect(body.role).toEqual('worker');
      });
  });

  it('Should show error for short password', () => {
    return request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({
        username: 'test',
        password: '123',
      })
      .expect(400)
      .expect({
        error: 'Bad Request',
        message: ['password must be longer than or equal to 8 characters'],
        statusCode: 400,
      });
  });
});
