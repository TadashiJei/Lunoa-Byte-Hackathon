import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Bid } from '../entities/bid.entity';
import { Contract } from '../entities/contract.entity';

@Injectable()
export class MarketplaceService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Bid)
    private readonly bidRepository: Repository<Bid>,
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
  ) {}

  async createProject(projectData: Partial<Project>): Promise<Project> {
    const project = this.projectRepository.create(projectData);
    return this.projectRepository.save(project);
  }

  async findAllProjects(): Promise<Project[]> {
    return this.projectRepository.find({ relations: ['owner', 'bids', 'contracts'] });
  }

  async findProjectById(id: string): Promise<Project | null> {
    return this.projectRepository.findOne({ where: { id }, relations: ['owner', 'bids', 'contracts'] });
  }

  async createBid(bidData: Partial<Bid>): Promise<Bid> {
    const bid = this.bidRepository.create(bidData);
    return this.bidRepository.save(bid);
  }

  async createContract(contractData: Partial<Contract>): Promise<Contract> {
    const contract = this.contractRepository.create(contractData);
    return this.contractRepository.save(contract);
  }
}
