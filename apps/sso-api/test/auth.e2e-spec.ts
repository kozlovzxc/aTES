import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AccountService } from '../src/auth/account.service';

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

  describe('POST /auth/sign-up', () => {
    it('Should create user for valid data', () => {
      return request(app.getHttpServer())
        .post('/auth/sign-up')
        .send({
          username: 'test',
          password: '12345678',
        })
        .expect(201)
        .expect(({ body }) => {
          expect(body.accessToken).toBeTruthy();
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

  describe('POST /auth/sign-in', () => {
    it("Should show error if user doesn't exists", () => {
      return request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({
          username: 'test',
          password: '123',
        })
        .expect(404)
        .expect({
          message: "User wasn't not found",
          statusCode: 404,
        });
    });

    it('Should show successfully sign in', async () => {
      const accountService = await app.get<AccountService>(AccountService);
      await accountService.create({
        username: 'test',
        password: '123',
      });

      return request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({
          username: 'test',
          password: '123',
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.accessToken).toBeTruthy();
        });
    });
  });
});
