import { Module } from '@nestjs/common';
import { CommunicationsController } from './controllers/communications.controller';
import { CommunicationsService } from './services/communications.service';

@Module({
  controllers: [CommunicationsController],
  providers: [CommunicationsService],
  exports: [CommunicationsService],
})
export class CommunicationsModule {}
