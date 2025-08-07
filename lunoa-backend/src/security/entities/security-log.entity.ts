import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum SecurityEventType {
  LOGIN = 'login',
  LOGIN_FAILED = 'login_failed',
  LOGOUT = 'logout',
  PASSWORD_CHANGE = 'password_change',
  PASSWORD_RESET = 'password_reset',
  ACCOUNT_LOCKED = 'account_locked',
  ACCOUNT_UNLOCKED = 'account_unlocked',
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
  SECURITY_SCAN = 'security_scan',
  PHISHING_DETECTED = 'phishing_detected',
  MALWARE_DETECTED = 'malware_detected',
  NETWORK_THREAT = 'network_threat',
  API_RATE_LIMIT = 'api_rate_limit',
  UNAUTHORIZED_ACCESS = 'unauthorized_access',
  DATA_EXPORT = 'data_export',
  PRIVACY_VIOLATION = 'privacy_violation',
}

export enum SecurityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

@Entity('security_logs')
export class SecurityLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.securityLogs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid', nullable: true })
  userId: string;

  @Column({ type: 'enum', enum: SecurityEventType })
  eventType: SecurityEventType;

  @Column({ type: 'enum', enum: SecurityLevel })
  level: SecurityLevel;

  @Column()
  message: string;

  @Column({ type: 'jsonb', nullable: true })
  details: {
    ipAddress: string;
    userAgent: string;
    location: {
      country: string;
      city: string;
      coordinates: {
        latitude: number;
        longitude: number;
      };
    };
    deviceInfo: {
      type: string;
      os: string;
      browser: string;
    };
    sessionId: string;
    requestId: string;
    errorCode: string;
    stackTrace: string;
    affectedResources: string[];
    remediationSteps: string[];
  };

  @Column({ type: 'jsonb', nullable: true })
  threatData: {
    threatType: string;
    threatLevel: string;
    confidence: number;
    indicators: string[];
    signatures: string[];
    iocs: string[];
    mitigation: string;
  };

  @Column({ type: 'boolean', default: false })
  isResolved: boolean;

  @Column({ type: 'timestamp', nullable: true })
  resolvedAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  resolution: {
    action: string;
    outcome: string;
    followUpRequired: boolean;
    nextSteps: string[];
  };

  @CreateDateColumn()
  createdAt: Date;

  // Helper methods
  get isCritical(): boolean {
    return this.level === SecurityLevel.CRITICAL;
  }

  get requiresImmediateAction(): boolean {
    return this.level === SecurityLevel.CRITICAL || this.level === SecurityLevel.HIGH;
  }
}
