import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Harvest } from './entities/harvest.entity';
import { CreateHarvestDto, UpdateHarvestDto } from './dto/harvest.dto';
import { Farm } from '../farms/entities/farm.entity';

@Injectable()
export class HarvestService {
  constructor(
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
  ) {}

  async create(data: CreateHarvestDto) {
    const farm = await this.farmRepository.findOne({ where: { id: data.farmId } });
    if (!farm) throw new NotFoundException('Farm not found');
    const harvest = this.harvestRepository.create({
      name: data.name,
      farm,
    });
    return this.harvestRepository.save(harvest);
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
