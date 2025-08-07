import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Bid } from './entities/bid.entity';
import { Contract } from './entities/contract.entity';
import { MarketplaceService } from './services/marketplace.service';
import { MarketplaceController } from './controllers/marketplace.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Bid, Contract])],
  controllers: [MarketplaceController],
  providers: [MarketplaceService],
  exports: [MarketplaceService],
})
export class MarketplaceModule {}
