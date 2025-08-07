import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MarketplaceService } from '../services/marketplace.service';

@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Get('projects')
  async findAllProjects() {
    return this.marketplaceService.findAllProjects();
  }

  @Get('projects/:id')
  async findProjectById(@Param('id') id: string) {
    return this.marketplaceService.findProjectById(id);
  }

  @Post('projects')
  async createProject(@Body() projectData: any) {
    return this.marketplaceService.createProject(projectData);
  }

  @Post('bids')
  async createBid(@Body() bidData: any) {
    return this.marketplaceService.createBid(bidData);
  }

  @Post('contracts')
  async createContract(@Body() contractData: any) {
    return this.marketplaceService.createContract(contractData);
  }
}
