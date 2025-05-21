import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from './entities/producer.entity';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';

@Injectable()
export class ProducersService {
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepo: Repository<Producer>,
  ) {}

  async create(dto: CreateProducerDto): Promise<Producer> {
    const producer = this.producerRepo.create(dto);
    return this.producerRepo.save(producer);
  }

  async findAll(): Promise<Producer[]> {
    return this.producerRepo.find({ relations: ['farms'] });
  }

  async findOne(id: string): Promise<Producer> {
    const producer = await this.producerRepo.findOne({ where: { id }, relations: ['farms'] });
    if (!producer) throw new NotFoundException('Produtor não encontrado');
    return producer;
  }

  async update(id: string, dto: UpdateProducerDto): Promise<Producer> {
    await this.findOne(id);
    await this.producerRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.producerRepo.delete(id);
  }
}
