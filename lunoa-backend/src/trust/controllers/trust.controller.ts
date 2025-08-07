import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TrustService } from '../services/trust.service';

@Controller('trust')
export class TrustController {
  constructor(private readonly trustService: TrustService) {}

  @Get('score/:userId')
  async getTrustScore(@Param('userId') userId: string) {
    return this.trustService.getTrustScore(userId);
  }

  @Post('calculate/:userId')
  async calculateTrustScore(@Param('userId') userId: string) {
    return this.trustService.calculateTrustScore(userId);
  }

  @Post('review')
  async addReview(@Body() reviewData: any) {
    return this.trustService.addReview(reviewData);
  }
}
