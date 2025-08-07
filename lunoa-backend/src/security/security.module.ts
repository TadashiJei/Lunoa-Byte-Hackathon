import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityLog } from './entities/security-log.entity';
import { SecurityController } from './controllers/security.controller';
import { SecurityService } from './services/security.service';

@Module({
  imports: [TypeOrmModule.forFeature([SecurityLog])],
  controllers: [SecurityController],
  providers: [SecurityService],
  exports: [SecurityService],
})
export class SecurityModule {}
