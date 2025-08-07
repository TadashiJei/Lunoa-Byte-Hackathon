import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CommunicationsService } from '../services/communications.service';
import { CreateMessageDto } from '../dto/create-message.dto';
import { CreateNotificationDto } from '../dto/create-notification.dto';

@Controller('communications')
export class CommunicationsController {
  constructor(private readonly communicationsService: CommunicationsService) {}

  @Post('messages')
  async sendMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.communicationsService.sendMessage(createMessageDto);
  }

  @Get('messages/:userId')
  async getUserMessages(@Param('userId') userId: string) {
    return this.communicationsService.getUserMessages(userId);
  }

  @Post('notifications')
  async sendNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.communicationsService.sendNotification(createNotificationDto);
  }

  @Get('notifications/:userId')
  async getUserNotifications(@Param('userId') userId: string) {
    return this.communicationsService.getUserNotifications(userId);
  }

  @Post('email')
  async sendEmail(@Body() emailData: any) {
    return this.communicationsService.sendEmail(emailData);
  }

  @Post('sms')
  async sendSms(@Body() smsData: any) {
    return this.communicationsService.sendSms(smsData);
  }
}
