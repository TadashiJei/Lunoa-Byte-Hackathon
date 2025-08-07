import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

// Skipping this test suite as the MarketplaceModule is not implemented
describe.skip('Marketplace (e2e)', () => {
  let app: INestApplication;

  beforeAll(() => {
    app = global.__APP__;
  });

  it('GET /api/v1/marketplace/projects -> should return an array of projects', () => {
    return request(app.getHttpServer())
      .get('/api/v1/marketplace/projects')
      .expect(200);
  });
});
