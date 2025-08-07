import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum BusinessType {
  SOLE_PROPRIETORSHIP = 'sole_proprietorship',
  PARTNERSHIP = 'partnership',
  CORPORATION = 'corporation',
  COOPERATIVE = 'cooperative',
  NON_PROFIT = 'non_profit',
}

export enum BusinessStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  DISSOLVED = 'dissolved',
}

@Entity('businesses')
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.business)
  @JoinColumn()
  user: User;

  @Column({ type: 'uuid' })
  userId: string;

  @Column()
  businessName: string;

  @Column({ type: 'enum', enum: BusinessType })
  businessType: BusinessType;

  @Column({ type: 'enum', enum: BusinessStatus, default: BusinessStatus.ACTIVE })
  status: BusinessStatus;

  @Column()
  registrationNumber: string;

  @Column({ nullable: true })
  taxId: string;

  @Column({ nullable: true })
  businessPermitNumber: string;

  @Column({ type: 'jsonb', nullable: true })
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  contactInfo: {
    phone: string;
    email: string;
    website: string;
    socialMedia: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
  };

  @Column({ type: 'jsonb', nullable: true })
  businessDetails: {
    industry: string;
    description: string;
    foundedYear: number;
    employeeCount: string;
    annualRevenue: string;
    services: string[];
    products: string[];
  };

  @Column({ type: 'jsonb', nullable: true })
  verification: {
    documents: {
      businessPermit: string;
      taxRegistration: string;
      financialStatements: string[];
      bankStatements: string[];
    };
    verifiedAt: Date;
    expiresAt: Date;
    verificationLevel: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  financialInfo: {
    bankName: string;
    bankAccount: string;
    paymentMethods: string[];
    creditScore: number;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
