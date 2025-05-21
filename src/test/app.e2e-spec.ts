import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/producers (GET)', () => {
    return request(app.getHttpServer())
      .get('/producers')
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/farms (GET)', () => {
    return request(app.getHttpServer())
      .get('/farms')
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/harvests (GET)', () => {
    return request(app.getHttpServer())
      .get('/harvests')
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/crops (GET)', () => {
    return request(app.getHttpServer())
      .get('/crops')
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });
});
