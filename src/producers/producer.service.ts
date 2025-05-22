import { Injectable, NotFoundException, Logger, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from './entities/producer.entity';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';

@Injectable()
export class ProducersService {
  private readonly logger = new Logger(ProducersService.name);
  constructor(
    @InjectRepository(Producer)
    private readonly producerRepo: Repository<Producer>,
  ) {}

  async create(dto: CreateProducerDto): Promise<Producer> {
    this.logger.log(`Criando produtor: ${JSON.stringify(dto)}`);
    // Verifica se já existe documento
    const existing = await this.producerRepo.findOne({ where: { document: dto.document } });
    if (existing) {
      throw new BadRequestException('Já existe um produtor com este CPF/CNPJ');
    }
    const producer = this.producerRepo.create(dto);
    const saved = await this.producerRepo.save(producer);
    this.logger.log(`Produtor criado com id: ${saved.id}`);
    return saved;
  }

  async findAll(): Promise<Producer[]> {
    this.logger.log('Buscando todos os produtores');
    return this.producerRepo.find({ relations: ['farms'] });
  }

  async findOne(id: string): Promise<Producer> {
    this.logger.log(`Buscando produtor id: ${id}`);
    const producer = await this.producerRepo.findOne({ where: { id }, relations: ['farms'] });
    if (!producer) {
      this.logger.warn(`Produtor não encontrado: ${id}`);
      throw new NotFoundException('Produtor não encontrado');
    }
    return producer;
  }

  async update(id: string, dto: UpdateProducerDto): Promise<Producer> {
    this.logger.log(`Atualizando produtor id: ${id} com dados: ${JSON.stringify(dto)}`);
    await this.findOne(id);
    await this.producerRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removendo produtor id: ${id}`);
    await this.findOne(id);
    try {
      await this.producerRepo.delete(id);
    } catch (err) {
      // Trata erro de integridade referencial (chave estrangeira)
      if (err && err.driverError && err.driverError.code === '23503') {
        throw new ForbiddenException('Não é possível deletar: produtor utilizado em fazenda');
      }
      throw err;
    }
  }
}
