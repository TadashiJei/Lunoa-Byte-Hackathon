import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  url: 'postgresql://neondb_owner:npg_lDsqm2R1OQSk@ep-bold-firefly-a1nl4w44-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'test',
  logging: process.env.NODE_ENV !== 'test',
  ssl: { rejectUnauthorized: false },
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});

export default databaseConfig;
