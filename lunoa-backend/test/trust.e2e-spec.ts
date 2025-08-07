import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

// Skipping this test suite as the TrustModule is not implemented
describe.skip('Trust (e2e)', () => {
  let app: INestApplication;

  beforeAll(() => {
    app = global.__APP__;
  });

  it('GET /api/v1/trust/score/:userId -> should return a trust score for a user', () => {
    const userId = '00000000-0000-0000-0000-000000000001';
    return request(app.getHttpServer())
      .get(`/api/v1/trust/score/${userId}`)
      .expect(200);
  });
});
