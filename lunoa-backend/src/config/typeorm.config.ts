import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// Load environment variables from .env files
config({ path: '.env.local' });
config({ path: '.env' });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: 'postgresql://neondb_owner:npg_lDsqm2R1OQSk@ep-bold-firefly-a1nl4w44-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  ssl: { rejectUnauthorized: false },
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
