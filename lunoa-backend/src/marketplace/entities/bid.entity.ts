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
import { Project } from './project.entity';

export enum BidStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  WITHDRAWN = 'withdrawn',
}

@Entity('bids')
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.bids)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ type: 'uuid' })
  projectId: string;

  @ManyToOne(() => User, (user) => user.bids)
  @JoinColumn({ name: 'bidder_id' })
  bidder: User;

  @Column({ type: 'uuid' })
  bidderId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'int' })
  duration: number; // in days

  @Column({ type: 'text', nullable: true })
  proposal: string;

  @Column({ type: 'jsonb', nullable: true })
  deliverables: {
    description: string;
    timeline: string;
    milestones: {
      description: string;
      percentage: number;
      deadline: Date;
    }[];
  }[];

  @Column({ type: 'jsonb', nullable: true })
  portfolio: {
    name: string;
    url: string;
    description: string;
  }[];

  @Column({ type: 'enum', enum: BidStatus, default: BidStatus.DRAFT })
  status: BidStatus;

  @Column({ type: 'jsonb', nullable: true })
  terms: {
    paymentSchedule: string;
    revisions: number;
    supportPeriod: number;
    additionalServices: string[];
  };

  @Column({ type: 'int', default: 0 })
  revisionCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Helper methods
  get isActive(): boolean {
    return this.status === BidStatus.SUBMITTED;
  }

  get isAccepted(): boolean {
    return this.status === BidStatus.ACCEPTED;
  }
}
