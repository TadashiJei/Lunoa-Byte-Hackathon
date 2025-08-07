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
import { IsEmail, IsEnum, IsString, MinLength, MaxLength } from 'class-validator';
import { Business } from '../../businesses/entities/business.entity';
import { TrustScore } from '../../trust/entities/trust-score.entity';
import { Project } from '../../marketplace/entities/project.entity';
import { SecurityLog } from '../../security/entities/security-log.entity';
import { Bid } from '../../marketplace/entities/bid.entity';
import { Contract } from '../../marketplace/entities/contract.entity';
import { TrustReview } from '../../trust/entities/trust-review.entity';

export enum UserRole {
  MSME = 'msme',
  PROVIDER = 'provider',
  ADMIN = 'admin',
}

export enum UserStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  SUSPENDED = 'suspended',
  DEACTIVATED = 'deactivated',
}

export enum VerificationLevel {
  BASIC = 'basic',
  STANDARD = 'standard',
  PREMIUM = 'premium',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @Column()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @Column({ unique: true })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.MSME })
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.PENDING })
  @IsEnum(UserStatus)
  status: UserStatus;

  @Column({ type: 'enum', enum: VerificationLevel, default: VerificationLevel.BASIC })
  @IsEnum(VerificationLevel)
  verificationLevel: VerificationLevel;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'jsonb', nullable: true })
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  kycData: {
    idType: string;
    idNumber: string;
    idUrl: string;
    selfieUrl: string;
    businessPermitUrl?: string;
    taxIdUrl?: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  preferences: {
    notifications: boolean;
    email: boolean;
    sms: boolean;
    language: string;
    timezone: string;
  };

  @Column({ type: 'timestamp', nullable: true })
  emailVerifiedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  suspendedAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @OneToOne(() => Business, (business) => business.user)
  business: Business;

  @OneToOne(() => TrustScore, (trustScore) => trustScore.user)
  trustScore: TrustScore;

  @OneToMany(() => Project, (project) => project.owner)
  projects: Project[];

  @OneToMany(() => SecurityLog, (securityLog) => securityLog.user)
  securityLogs: SecurityLog[];

  @OneToMany(() => Bid, (bid) => bid.bidder)
  bids: Bid[];

  @OneToMany(() => Contract, (contract) => contract.client)
  contractsAsClient: Contract[];

  @OneToMany(() => Contract, (contract) => contract.provider)
  contractsAsProvider: Contract[];

  @OneToMany(() => TrustReview, (review) => review.reviewer)
  reviews: TrustReview[];

  @OneToMany(() => TrustReview, (review) => review.subjectUser)
  receivedReviews: TrustReview[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Helper methods
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get isEmailVerified(): boolean {
    return !!this.emailVerifiedAt;
  }

  get isActive(): boolean {
    return this.status === UserStatus.VERIFIED;
  }
}
