import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Harvest } from './entities/harvest.entity';
import { CreateHarvestDto, UpdateHarvestDto } from './dto/harvest.dto';
import { Farm } from '../farms/entities/farm.entity';

@Injectable()
export class HarvestService {
  private readonly logger = new Logger(HarvestService.name);
  constructor(
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
  ) {}

  async create(data: CreateHarvestDto) {
    this.logger.log(`Criando safra: ${JSON.stringify(data)}`);
    const farm = await this.farmRepository.findOne({ where: { id: data.farmId } });
    if (!farm) {
      this.logger.warn(`Fazenda não encontrada para safra: ${data.farmId}`);
      throw new NotFoundException('Farm not found');
    }
    const harvest = this.harvestRepository.create({
      name: data.name,
      farm,
    });
    const saved = await this.harvestRepository.save(harvest);
    this.logger.log(`Safra criada com id: ${saved.id}`);
    return saved;
  }

  findAll() {
    this.logger.log('Buscando todas as safras');
    return this.harvestRepository.find({ relations: ['farm', 'crops'] });
  }

  findOne(id: string) {
    this.logger.log(`Buscando safra id: ${id}`);
    return this.harvestRepository.findOne({ where: { id }, relations: ['farm', 'crops'] });
  }

  update(id: string, data: UpdateHarvestDto) {
    this.logger.log(`Atualizando safra id: ${id} com dados: ${JSON.stringify(data)}`);
    return this.harvestRepository.update(id, data);
  }

  remove(id: string) {
    this.logger.log(`Removendo safra id: ${id}`);
    return this.harvestRepository.delete(id);
  }
}
