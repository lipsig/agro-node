import { Injectable, NotFoundException, Logger, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from './entities/farm.entity';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Producer } from '../producers/entities/producer.entity';

@Injectable()
export class FarmService {
  private readonly logger = new Logger(FarmService.name);
  constructor(
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
    @InjectRepository(Producer)
    private producerRepository: Repository<Producer>,
  ) {}

  async create(createFarmDto: CreateFarmDto): Promise<Farm> {
    this.logger.log(`Criando fazenda: ${JSON.stringify(createFarmDto)}`);
    // Validação da soma das áreas
    if (
      createFarmDto.agricultural_area + createFarmDto.vegetation_area >
      createFarmDto.total_area
    ) {
      this.logger.warn('Soma das áreas excede a área total');
      throw new Error(
        'A soma de área agricultável e vegetação não pode exceder a área total',
      );
    }

    const producer = await this.producerRepository.findOne({
      where: { id: createFarmDto.producerId },
    });

    if (!producer) {
      this.logger.warn(`Produtor não encontrado: ${createFarmDto.producerId}`);
      throw new NotFoundException('Producer not found');
    }

    // Não permite fazenda com o mesmo nome (independente do produtor)
    const existing = await this.farmRepository.findOne({
      where: { name: createFarmDto.name },
    });
    if (existing) {
      throw new BadRequestException('Já existe uma fazenda com este nome');
    }

    const farm = this.farmRepository.create({
      ...createFarmDto,
      producer,
    });

    const saved = await this.farmRepository.save(farm);
    this.logger.log(`Fazenda criada com id: ${saved.id}`);
    return saved;
  }

  findAll(): Promise<Farm[]> {
    this.logger.log('Buscando todas as fazendas');
    return this.farmRepository.find({ relations: ['producer'] });
  }

  async findOne(id: string): Promise<Farm> {
    this.logger.log(`Buscando fazenda id: ${id}`);
    const farm = await this.farmRepository.findOne({ where: { id }, relations: ['producer'] });

    if (!farm) {
      this.logger.warn(`Fazenda não encontrada: ${id}`);
      throw new NotFoundException('Farm not found');
    }

    return farm;
  }

  async update(id: string, updateFarmDto: UpdateFarmDto): Promise<Farm> {
    this.logger.log(`Atualizando fazenda id: ${id} com dados: ${JSON.stringify(updateFarmDto)}`);
    const farm = await this.findOne(id);

    // Validação da soma das áreas ao atualizar
    const agricultural_area =
      updateFarmDto.agricultural_area ?? farm.agricultural_area;
    const vegetation_area =
      updateFarmDto.vegetation_area ?? farm.vegetation_area;
    const total_area = updateFarmDto.total_area ?? farm.total_area;

    if (agricultural_area + vegetation_area > total_area) {
      this.logger.warn('Soma das áreas excede a área total na atualização');
      throw new Error(
        'A soma de área agricultável e vegetação não pode exceder a área total',
      );
    }

    Object.assign(farm, updateFarmDto);

    const saved = await this.farmRepository.save(farm);
    this.logger.log(`Fazenda atualizada id: ${saved.id}`);
    return saved;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removendo fazenda id: ${id}`);
    const farm = await this.findOne(id);

    // Verifica se há safras ou culturas associadas
    const hasHarvests = farm.harvests && farm.harvests.length > 0;
    const hasCrops = farm.crops && farm.crops.length > 0;
    if (hasHarvests) {
      throw new ForbiddenException('Não é possível deletar: fazenda utilizada em registro de safra');
    }
    if (hasCrops) {
      throw new ForbiddenException('Não é possível deletar: fazenda utilizada em registro de cultura');
    }

    try {
      await this.farmRepository.remove(farm);
    } catch (err) {
      // Trata erro de integridade referencial (chave estrangeira)
      if (err && err.driverError && err.driverError.code === '23503') {
        throw new ForbiddenException('Não é possível deletar: fazenda utilizada em registro de safra ou cultura');
      }
      throw err;
    }
  }
}
