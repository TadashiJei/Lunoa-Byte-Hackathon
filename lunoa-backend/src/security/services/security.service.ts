import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecurityLog } from '../entities/security-log.entity';

@Injectable()
export class SecurityService {
  constructor(
    @InjectRepository(SecurityLog)
    private securityLogRepository: Repository<SecurityLog>,
  ) {}

  async getAllLogs(): Promise<SecurityLog[]> {
    return this.securityLogRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async getUserLogs(userId: string): Promise<SecurityLog[]> {
    return this.securityLogRepository.find({
      where: { userId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async createLog(logData: any) {
    const log = this.securityLogRepository.create(logData);
    const savedLog = await this.securityLogRepository.save(log);
    return savedLog;
  }

  async getThreats(): Promise<any[]> {
    return [];
  }

  async getSecurityAnalytics(): Promise<any> {
    return {
      totalLogs: await this.securityLogRepository.count(),
      recentThreats: 0,
      activeUsers: 0,
    };
  }
}
