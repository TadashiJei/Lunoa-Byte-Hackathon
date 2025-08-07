import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/services/users.service';
import { INestApplication, Logger } from '@nestjs/common';
import { execSync } from 'child_process';

// Declare a global variable to hold the app instance
declare global {
  var __APP__: INestApplication;
}

export default async () => {
  console.log('\n[GlobalSetup] Starting...');

  // Create the test application
  let app: INestApplication | null = null;
  try {
    console.log('[GlobalSetup] Creating NestJS testing module...');
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useLogger(new Logger('TestInstance', { timestamp: true }));

    console.log('[GlobalSetup] Initializing NestJS application...');
    await app.init();


    console.log('[GlobalSetup] NestJS application initialized.');

        const usersService = app.get(UsersService);

    (global as any).__APP__ = app;
    (global as any).__USERS_SERVICE__ = usersService;
  } catch (error) {
    console.error('\n[GlobalSetup] FATAL: Failed to initialize NestJS application:', error);
    if (app) {
      await app.close();
    }
    process.exit(1);
  }

  // 3. Set up teardown process
  process.on('SIGTERM', async () => {
    console.log('\n[GlobalTeardown] Closing NestJS application...');
    if (global.__APP__) {
      await   (global as any).__APP__.close();
    }
    process.exit(0);
  });

  console.log('[GlobalSetup] Setup complete. Running tests...');
};
