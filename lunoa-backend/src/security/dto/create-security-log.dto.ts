import { IsEnum, IsString, IsOptional } from 'class-validator';

export enum SecurityEventType {
  LOGIN_ATTEMPT = 'login_attempt',
  FAILED_LOGIN = 'failed_login',
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
  DATA_ACCESS = 'data_access',
  PERMISSION_CHANGE = 'permission_change',
  SYSTEM_ALERT = 'system_alert',
}

export enum SecuritySeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export class CreateSecurityLogDto {
  @IsString()
  userId: string;

  @IsEnum(SecurityEventType)
  eventType: SecurityEventType;

  @IsEnum(SecuritySeverity)
  severity: SecuritySeverity;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  ipAddress?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;

  @IsOptional()
  metadata?: Record<string, any>;
}
