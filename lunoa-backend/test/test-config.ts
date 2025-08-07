import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

/**
 * Test configuration that bypasses database dependencies
 * Focuses on code structure verification without actual database connections
 */

export class TestConfig {
  static async createTestingModule(modules: any[]): Promise<TestingModule> {
    return Test.createTestingModule({
      imports: modules,
    }).compile();
  }

  static async createApp(modules: any[]): Promise<INestApplication> {
    const module = await this.createTestingModule(modules);
    return module.createNestApplication();
  }

  static mockDatabase() {
    return {
      createQueryRunner: jest.fn(() => ({
        connect: jest.fn(),
        release: jest.fn(),
        startTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        rollbackTransaction: jest.fn(),
        query: jest.fn(),
      })),
      getRepository: jest.fn(() => ({
        find: jest.fn(),
        findOne: jest.fn(),
        save: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      })),
      synchronize: jest.fn(),
      initialize: jest.fn(),
      destroy: jest.fn(),
    };
  }

  static mockService(serviceName: string) {
    return {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
  }

  static mockRepository(entityName: string) {
    return {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  }
}
