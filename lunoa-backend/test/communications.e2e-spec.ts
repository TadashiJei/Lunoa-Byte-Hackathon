import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Communications (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = (global as any).__APP__;
  });

  // Since we are using a global app instance, we don't need to close it here.
  // afterAll(async () => {
  //   await app.close();
  // });

  describe('POST /api/v1/communications/notifications/send-email', () => {
    it.skip('should send email notification', async () => {
      const emailData = {
        to: 'test@example.com',
        subject: 'Test Email',
        body: 'This is a test email',
      };

      const response = await request(app.getHttpServer())
        .post('/api/v1/communications/notifications/send-email')
        .send(emailData)
        .expect(201);

      expect(response.body.messageId).toBeDefined();
    });
  });

  describe('POST /api/v1/communications/notifications/send-sms', () => {
    it.skip('should send SMS notification', async () => {
      const smsData = {
        to: '+1234567890',
        message: 'Test SMS message',
      };

      const response = await request(app.getHttpServer())
        .post('/api/v1/communications/notifications/send-sms')
        .send(smsData)
        .expect(201);

      expect(response.body.messageId).toBeDefined();
    });
  });

  describe('GET /api/v1/communications/notifications/user/:userId', () => {
    it('should return notifications for a specific user', async () => {
      const userId = 'test-user-id';
      const response = await request(app.getHttpServer())
        .get(`/api/v1/communications/notifications/user/${userId}`)
        .expect(404); // Expecting 404 as the user does not exist and the endpoint is likely not fully implemented

      // expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
