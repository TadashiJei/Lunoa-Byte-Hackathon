import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum ReviewType {
  PROJECT_REVIEW = 'project_review',
  SERVICE_REVIEW = 'service_review',
  TRUST_REVIEW = 'trust_review',
}

export enum ReviewStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  FLAGGED = 'flagged',
}

@Entity('trust_reviews')
export class TrustReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'reviewer_id' })
  reviewer: User;

  @Column({ type: 'uuid' })
  reviewerId: string;

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'subject_user_id' })
  subjectUser: User;

  @Column({ type: 'uuid' })
  subjectUserId: string;

  @Column({ type: 'enum', enum: ReviewType })
  type: ReviewType;

  @Column({ type: 'enum', enum: ReviewStatus, default: ReviewStatus.PENDING })
  status: ReviewStatus;

  @Column({ type: 'int', nullable: true })
  rating: number; // 1-5 stars

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'uuid', nullable: true })
  projectId: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: {
    pros: string[];
    cons: string[];
    wouldRecommend: boolean;
    communication: number;
    quality: number;
    timeliness: number;
    professionalism: number;
  };

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ type: 'int', default: 0 })
  helpfulVotes: number;

  @Column({ type: 'int', default: 0 })
  totalVotes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Helper methods
  get helpfulnessRatio(): number {
    return this.totalVotes > 0 ? this.helpfulVotes / this.totalVotes : 0;
  }
}
