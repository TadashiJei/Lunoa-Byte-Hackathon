import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/services/users.service';
import { User } from '../src/users/entities/user.entity';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let createdUser: User;

  beforeAll(async () => {
    app = (global as any).__APP__;
    usersService = (global as any).__USERS_SERVICE__;

    const userData = {
      email: `test-auth-${Date.now()}@example.com`,
      username: `test-auth-${Date.now()}`,
      password: 'password123',
      firstName: 'Auth',
      lastName: 'User',
    };
    createdUser = await usersService.create(userData);
  });

  afterAll(async () => {
    if (createdUser) {
      await usersService.delete(createdUser.id);
    }
  });

  describe('POST /api/v1/auth/login', () => {
    it('should authenticate user and return JWT token', async () => {
      const loginData = {
        email: createdUser.email,
        password: 'password123',
      };

      const response = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body.access_token).toBeDefined();
      expect(typeof response.body.access_token).toBe('string');
    });

    it('should return 401 for invalid credentials', async () => {
      const loginData = {
        email: createdUser.email,
        password: 'wrong-password',
      };

      await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(401);
    });
  });

  describe('GET /api/v1/auth/profile', () => {
    it('should return user profile with valid token', async () => {
      const loginData = {
        email: createdUser.email,
        password: 'password123',
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send(loginData)
        .expect(200);

      const token = loginResponse.body.access_token;
      expect(token).toBeDefined();

      const profileResponse = await request(app.getHttpServer())
        .get('/api/v1/auth/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(profileResponse.body.email).toBe(createdUser.email);
    });

    it('should return 401 without token', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/auth/profile')
        .expect(401);
    });
  });
});
