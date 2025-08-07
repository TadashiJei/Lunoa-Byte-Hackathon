import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrustScore } from './entities/trust-score.entity';
import { TrustReview } from './entities/trust-review.entity';
import { TrustService } from './services/trust.service';
import { TrustController } from './controllers/trust.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TrustScore, TrustReview])],
  controllers: [TrustController],
  providers: [TrustService],
  exports: [TrustService],
})
export class TrustModule {}
