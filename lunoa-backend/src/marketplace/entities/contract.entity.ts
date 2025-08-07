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

export enum ContractStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DISPUTED = 'disputed',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PARTIAL = 'partial',
  COMPLETED = 'completed',
  REFUNDED = 'refunded',
}

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.contracts)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ type: 'uuid' })
  projectId: string;

  @ManyToOne(() => User, (user) => user.contractsAsClient)
  @JoinColumn({ name: 'client_id' })
  client: User;

  @ManyToOne(() => User, (user) => user.contractsAsProvider)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column({ type: 'uuid' })
  providerId: string;

  @Column({ type: 'uuid' })
  clientId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  paidAmount: number;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  @Column({ type: 'enum', enum: ContractStatus, default: ContractStatus.PENDING })
  status: ContractStatus;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'int', nullable: true })
  duration: number; // in days

  @Column({ type: 'jsonb', nullable: true })
  deliverables: {
    description: string;
    deadline: Date;
    status: string;
    completedAt: Date;
    approvalRequired: boolean;
  }[];

  @Column({ type: 'jsonb', nullable: true })
  paymentSchedule: {
    milestone: string;
    amount: number;
    percentage: number;
    dueDate: Date;
    status: string;
  }[];

  @Column({ type: 'jsonb', nullable: true })
  terms: {
    revisionPolicy: string;
    cancellationPolicy: string;
    disputeResolution: string;
    intellectualProperty: string;
    confidentiality: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  milestones: {
    description: string;
    deadline: Date;
    status: string;
    completedAt: Date;
    deliverables: string[];
  }[];

  @Column({ type: 'jsonb', nullable: true })
  communication: {
    preferredMethod: string;
    responseTime: string;
    meetingSchedule: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  dispute: {
    reason: string;
    status: string;
    resolution: string;
    resolvedAt: Date;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Helper methods
  get completionPercentage(): number {
    if (!this.milestones || this.milestones.length === 0) return 0;
    const completed = this.milestones.filter(m => m.status === 'completed').length;
    return (completed / this.milestones.length) * 100;
  }

  get remainingAmount(): number {
    return this.totalAmount - this.paidAmount;
  }

  get isOverdue(): boolean {
    if (!this.endDate) return false;
    return new Date() > this.endDate && this.status !== ContractStatus.COMPLETED;
  }
}
