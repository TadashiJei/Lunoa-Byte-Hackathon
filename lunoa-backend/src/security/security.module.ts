import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityLog } from './entities/security-log.entity';
import { SecurityController } from './controllers/security.controller';
import { SecurityService } from './services/security.service';
import { HomomorphicEncryptionController } from './controllers/homomorphic-encryption.controller';
import { HomomorphicEncryptionService } from './services/homomorphic-encryption.service';
import { AdvancedHEService } from './services/advanced-he.service';

@Module({
  imports: [TypeOrmModule.forFeature([SecurityLog])],
  controllers: [
    SecurityController,
    HomomorphicEncryptionController,
  ],
  providers: [
    SecurityService,
    HomomorphicEncryptionService,
    AdvancedHEService,
  ],
  exports: [
    SecurityService,
    HomomorphicEncryptionService,
    AdvancedHEService,
  ],
})
export class SecurityModule {}
