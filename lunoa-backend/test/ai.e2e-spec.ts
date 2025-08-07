import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AI (e2e)', () => {
  let app: INestApplication;

  beforeAll(() => {
    app = global.__APP__;
  });

  it('should calculate AI-powered trust score', () => {
    const data = {
      userId: 'test-user-id',
      transactionHistory: [],
      userProfile: {},
    };
    return request(app.getHttpServer())
      .post('/api/v1/ai/trust-score')
      .send(data)
      .expect(200);
  });

  it('should find AI-powered project matches', () => {
    const data = {
      projectDescription: 'Looking for a developer for a new e-commerce site.',
      requiredSkills: ['nestjs', 'react', 'postgresql'],
    };
    return request(app.getHttpServer())
      .post('/api/v1/ai/project-match')
      .send(data)
      .expect(200);
  });
});
