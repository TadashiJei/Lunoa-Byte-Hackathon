import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/services/users.service';

import { User } from '../src/users/entities/user.entity';

describe('Users (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let createdUser: User;

  beforeAll(async () => {
    app = (global as any).__APP__;
    usersService = (global as any).__USERS_SERVICE__;

    const userData = {
      email: `test-user-${Date.now()}@example.com`,
      username: `test-user-${Date.now()}`,
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
    };
    createdUser = await usersService.create(userData);
  });

  afterAll(async () => {
    if (createdUser) {
      await usersService.delete(createdUser.id);
    }
  });

  it('GET /api/v1/users -> should return an array of users', async () => {
    return request(app.getHttpServer())
      .get('/api/v1/users')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('POST /api/v1/users -> should create a new user', async () => {
        const newUser = {
      email: `test-post-${Date.now()}@example.com`,
      username: `test-post-${Date.now()}`,
      password: 'password123',
      firstName: 'Test',
      lastName: 'Post',
    };

    const response = await request(app.getHttpServer())
      .post('/api/v1/users')
      .send(newUser)
      .expect(201);

    expect(response.body.email).toBe(newUser.email);
    await usersService.delete(response.body.id); // Cleanup
  });

  it('GET /api/v1/users/:id -> should return a user by id', async () => {
    return request(app.getHttpServer())
      .get(`/api/v1/users/${createdUser.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdUser.id);
      });
  });

  it('PATCH /api/v1/users/:id -> should update a user', async () => {
    const updateData = { firstName: 'Updated' };
    return request(app.getHttpServer())
      .patch(`/api/v1/users/${createdUser.id}`)
      .send(updateData)
      .expect(200)
      .expect((res) => {
        expect(res.body.firstName).toBe(updateData.firstName);
      });
  });

  it('DELETE /api/v1/users/:id -> should delete a user', async () => {
        const userToDelete = await usersService.create({
      email: `test-delete-${Date.now()}@example.com`,
      username: `test-delete-${Date.now()}`,
      password: 'password123',
      firstName: 'Delete',
      lastName: 'Me',
    });

    await request(app.getHttpServer())
            .delete(`/api/v1/users/${userToDelete.id}`)
      .expect(204);

    await request(app.getHttpServer())
      .get(`/api/v1/users/${userToDelete.id}`)
      .expect(404);
  });
});
