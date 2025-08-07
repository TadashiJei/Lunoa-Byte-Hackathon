import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TrustReview } from './trust-review.entity';

export enum TrustBadge {
  VERIFIED = 'verified',
  PREMIUM = 'premium',
  TOP_RATED = 'top_rated',
  FAST_RESPONSE = 'fast_response',
  QUALITY_PROVIDER = 'quality_provider',
  RELIABLE_PARTNER = 'reliable_partner',
}

@Entity('trust_scores')
export class TrustScore {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.trustScore)
  @JoinColumn()
  user: User;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'int', default: 500 })
  overallScore: number; // 100-1000 scale

  @Column({ type: 'int', default: 0 })
  performanceScore: number; // 0-400

  @Column({ type: 'int', default: 0 })
  behaviorScore: number; // 0-300

  @Column({ type: 'int', default: 0 })
  securityScore: number; // 0-200

  @Column({ type: 'int', default: 0 })
  verificationScore: number; // 0-100

  @Column({ type: 'jsonb', nullable: true })
  scoreBreakdown: {
    projectCompletionRate: number;
    onTimeDelivery: number;
    qualityRating: number;
    communicationScore: number;
    disputeResolution: number;
    securityIncidents: number;
    complianceScore: number;
  };

  @Column({ type: 'simple-array', nullable: true })
  badges: TrustBadge[];

  @Column({ type: 'int', default: 0 })
  totalProjects: number;

  @Column({ type: 'int', default: 0 })
  completedProjects: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  averageRating: number;

  @Column({ type: 'int', default: 0 })
  totalReviews: number;

  @Column({ type: 'int', default: 0 })
  positiveReviews: number;

  @Column({ type: 'int', default: 0 })
  negativeReviews: number;

  @Column({ type: 'jsonb', nullable: true })
  verificationHistory: {
    type: string;
    status: string;
    verifiedAt: Date;
    expiresAt: Date;
    documents: string[];
  }[];

  @Column({ type: 'jsonb', nullable: true })
  behavioralMetrics: {
    responseTime: number;
    disputeRate: number;
    cancellationRate: number;
    communicationFrequency: number;
    profileCompleteness: number;
  };

  @Column({ type: 'timestamp', nullable: true })
  lastCalculatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  nextCalculationAt: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => TrustReview, (review) => review.subjectUser)
  reviews: TrustReview[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  // Helper methods
  getBadgeCount(): number {
    return this.badges?.length || 0;
  }

  getCompletionRate(): number {
    return this.totalProjects > 0 ? (this.completedProjects / this.totalProjects) * 100 : 0;
  }

  getPositiveReviewRate(): number {
    return this.totalReviews > 0 ? (this.positiveReviews / this.totalReviews) * 100 : 0;
  }

  isBadgeActive(badge: TrustBadge): boolean {
    return this.badges?.includes(badge) || false;
  }

  shouldRecalculate(): boolean {
    if (!this.lastCalculatedAt) return true;
    const now = new Date();
    const hoursSinceLastCalculation = (now.getTime() - this.lastCalculatedAt.getTime()) / (1000 * 60 * 60);
    return hoursSinceLastCalculation >= 24; // Recalculate every 24 hours
  }
}
