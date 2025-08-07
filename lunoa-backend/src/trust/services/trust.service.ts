import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrustScore } from '../entities/trust-score.entity';
import { TrustReview } from '../entities/trust-review.entity';

@Injectable()
export class TrustService {
  constructor(
    @InjectRepository(TrustScore)
    private readonly trustScoreRepository: Repository<TrustScore>,
    @InjectRepository(TrustReview)
    private readonly trustReviewRepository: Repository<TrustReview>,
  ) {}

  async calculateTrustScore(userId: string): Promise<TrustScore> {
    // Trust calculation logic will be implemented here
    const trustScore = this.trustScoreRepository.create({
      userId,
      overallScore: 500,
    });
    return this.trustScoreRepository.save(trustScore);
  }

  async getTrustScore(userId: string): Promise<TrustScore | null> {
    return this.trustScoreRepository.findOne({ where: { userId } });
  }

  async addReview(reviewData: Partial<TrustReview>): Promise<TrustReview> {
    const review = this.trustReviewRepository.create(reviewData);
    return this.trustReviewRepository.save(review);
  }
}
