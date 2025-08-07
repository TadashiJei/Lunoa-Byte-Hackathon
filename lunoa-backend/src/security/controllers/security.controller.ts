import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SecurityService } from '../services/security.service';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Get('logs')
  async getAllLogs() {
    return this.securityService.getAllLogs();
  }

  @Get('logs/user/:userId')
  async getUserLogs(@Param('userId') userId: string) {
    return this.securityService.getUserLogs(userId);
  }

  @Post('logs')
  async createLog(@Body() logData: any) {
    return this.securityService.createLog(logData);
  }

  @Get('threats')
  async getThreats() {
    return this.securityService.getThreats();
  }

  @Get('analytics')
  async getSecurityAnalytics() {
    return this.securityService.getSecurityAnalytics();
  }
}
