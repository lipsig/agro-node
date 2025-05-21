import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from './entities/crop.entity';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Farm } from '../farms/entities/farm.entity';
import { Harvest } from '../harvests/entities/harvest.entity';

@Injectable()
export class CropService {
  private readonly logger = new Logger(CropService.name);
  constructor(
    @InjectRepository(Crop)
    private cropRepository: Repository<Crop>,
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,
  ) {}

  async create(data: CreateCropDto) {
    this.logger.log(`Criando cultura: ${JSON.stringify(data)}`);
    const farm = await this.farmRepository.findOne({ where: { id: data.farmId } });
    if (!farm) throw new NotFoundException('Fazenda não encontrada');
    const harvest = await this.harvestRepository.findOne({ where: { id: data.harvestId } });
    if (!harvest) throw new NotFoundException('Safra não encontrada');
    const crop = this.cropRepository.create({
      name: data.name,
      farm,
      harvest,
    });
    const saved = await this.cropRepository.save(crop);
    // Retorna crop com relações populadas
    return this.cropRepository.findOne({
      where: { id: saved.id },
      relations: ['farm', 'harvest'],
    });
  }

  findAll() {
    this.logger.log('Buscando todas as culturas');
    return this.cropRepository.find({ relations: ['farm', 'harvest'] });
  }

  findOne(id: string) {
    this.logger.log(`Buscando cultura id: ${id}`);
    return this.cropRepository.findOne({ where: { id }, relations: ['farm', 'harvest'] });
  }

  async update(id: string, data: UpdateCropDto) {
    this.logger.log(`Atualizando cultura id: ${id} com dados: ${JSON.stringify(data)}`);
    // Atualiza farm/harvest se vierem no update
    const updateData: any = { ...data };
    if (data.farmId) {
      const farm = await this.farmRepository.findOne({ where: { id: data.farmId } });
      if (!farm) throw new NotFoundException('Fazenda não encontrada');
      updateData.farm = farm;
      delete updateData.farmId;
    }
    if (data.harvestId) {
      const harvest = await this.harvestRepository.findOne({ where: { id: data.harvestId } });
      if (!harvest) throw new NotFoundException('Safra não encontrada');
      updateData.harvest = harvest;
      delete updateData.harvestId;
    }
    await this.cropRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: string) {
    this.logger.log(`Removendo cultura id: ${id}`);
    await this.cropRepository.delete(id);
  }
}
