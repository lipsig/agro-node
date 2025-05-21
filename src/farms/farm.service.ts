import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from './entities/farm.entity';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Producer } from '../producers/entities/producer.entity';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
    @InjectRepository(Producer)
    private producerRepository: Repository<Producer>,
  ) {}

  async create(createFarmDto: CreateFarmDto): Promise<Farm> {
    const producer = await this.producerRepository.findOne({
      where: { id: createFarmDto.producerId },
    });

    if (!producer) {
      throw new NotFoundException('Producer not found');
    }

    const farm = this.farmRepository.create({
      ...createFarmDto,
      producer,
    });

    return this.farmRepository.save(farm);
  }

  findAll(): Promise<Farm[]> {
    return this.farmRepository.find({ relations: ['producer'] });
  }

  async findOne(id: string): Promise<Farm> {
    const farm = await this.farmRepository.findOne({ where: { id }, relations: ['producer'] });

    if (!farm) {
      throw new NotFoundException('Farm not found');
    }

    return farm;
  }

  async update(id: string, updateFarmDto: UpdateFarmDto): Promise<Farm> {
    const farm = await this.findOne(id);

    Object.assign(farm, updateFarmDto);

    return this.farmRepository.save(farm);
  }

  async remove(id: string): Promise<void> {
    const farm = await this.findOne(id);
    await this.farmRepository.remove(farm);
  }
}
