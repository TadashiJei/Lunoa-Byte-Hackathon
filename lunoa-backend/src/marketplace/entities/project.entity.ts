import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Bid } from './bid.entity';
import { Contract } from './contract.entity';

export enum ProjectStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DISPUTED = 'disputed',
}

export enum ProjectCategory {
  WEB_DEVELOPMENT = 'web_development',
  MOBILE_DEVELOPMENT = 'mobile_development',
  GRAPHIC_DESIGN = 'graphic_design',
  DIGITAL_MARKETING = 'digital_marketing',
  CONTENT_WRITING = 'content_writing',
  VIDEO_EDITING = 'video_editing',
  DATA_ENTRY = 'data_entry',
  VIRTUAL_ASSISTANT = 'virtual_assistant',
  ACCOUNTING = 'accounting',
  LEGAL_SERVICES = 'legal_services',
  CONSULTING = 'consulting',
  OTHER = 'other',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ type: 'uuid' })
  ownerId: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ProjectCategory })
  category: ProjectCategory;

  @Column({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.DRAFT })
  status: ProjectStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  budgetMin: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  budgetMax: number;

  @Column({ type: 'int' })
  duration: number; // in days

  @Column({ type: 'jsonb', nullable: true })
  requirements: {
    skills: string[];
    experience: string;
    certifications: string[];
    tools: string[];
    language: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  deliverables: {
    description: string;
    format: string;
    deadline: Date;
    milestones: {
      description: string;
      percentage: number;
      deadline: Date;
    }[];
  }[];

  @Column({ type: 'jsonb', nullable: true })
  attachments: {
    name: string;
    url: string;
    type: string;
    size: number;
  }[];

  @Column({ type: 'int', default: 0 })
  viewCount: number;

  @Column({ type: 'int', default: 0 })
  bidCount: number;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  tags: string[];

  @OneToMany(() => Bid, (bid) => bid.project)
  bids: Bid[];

  @OneToMany(() => Contract, (contract) => contract.project)
  contracts: Contract[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Helper methods
  get averageBidAmount(): number {
    if (!this.bids || this.bids.length === 0) return 0;
    const total = this.bids.reduce((sum, bid) => sum + bid.amount, 0);
    return total / this.bids.length;
  }

  get isOpenForBids(): boolean {
    return this.status === ProjectStatus.PUBLISHED;
  }

  get completionPercentage(): number {
    if (!this.startedAt || !this.completedAt) return 0;
    const now = new Date();
    const totalDuration = this.completedAt.getTime() - this.startedAt.getTime();
    const elapsedDuration = now.getTime() - this.startedAt.getTime();
    return Math.min((elapsedDuration / totalDuration) * 100, 100);
  }
}
