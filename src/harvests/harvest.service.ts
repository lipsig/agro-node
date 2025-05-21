import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Harvest } from './entities/harvest.entity';
import { CreateHarvestDto, UpdateHarvestDto } from './dto/harvest.dto';

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,
  ) {}

  create(data: CreateHarvestDto) {
    return this.harvestRepository.save(data);
  }

  findAll() {
    return this.harvestRepository.find({ relations: ['crops'] });
  }

  findOne(id: string) {
    return this.harvestRepository.findOne({ where: { id }, relations: ['crops'] });
  }

  update(id: string, data: UpdateHarvestDto) {
    return this.harvestRepository.update(id, data);
  }

  remove(id: string) {
    return this.harvestRepository.delete(id);
  }
}
