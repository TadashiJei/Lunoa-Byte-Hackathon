import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Security (e2e)', () => {
  let app: INestApplication;

  beforeAll(() => {
    app = global.__APP__;
  });

  it('GET /api/v1/security/logs -> should return an array of security logs', () => {
    return request(app.getHttpServer())
      .get('/api/v1/security/logs')
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('POST /api/v1/security/logs -> should create a new security log', () => {
    const logData = {
      eventType: 'login',
      level: 'low',
      userId: '00000000-0000-0000-0000-000000000001',
      ipAddress: '127.0.0.1',
            message: 'User login event',
      details: 'This log was created during an e2e test.',
    };
    return request(app.getHttpServer())
      .post('/api/v1/security/logs')
      .send(logData)
      .expect(201)
      .then((res) => {
        expect(res.body.eventType).toBe(logData.eventType);
        expect(res.body.id).toBeDefined();
      });
  });

  it('GET /api/v1/security/logs/user/:userId -> should return logs for a user', () => {
    const userId = '00000000-0000-0000-0000-000000000001';
    return request(app.getHttpServer())
      .get(`/api/v1/security/logs/user/${userId}`)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });
});
