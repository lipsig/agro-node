import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from './entities/crop.entity';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

@Injectable()
export class CropService {
  constructor(
    @InjectRepository(Crop)
    private cropRepository: Repository<Crop>,
  ) {}

  create(data: CreateCropDto) {
    return this.cropRepository.save(data);
  }

  findAll() {
    return this.cropRepository.find({ relations: ['farm', 'harvest'] });
  }

  findOne(id: string) {
    return this.cropRepository.findOne({ where: { id }, relations: ['farm', 'harvest'] });
  }

  update(id: string, data: UpdateCropDto) {
    return this.cropRepository.update(id, data);
  }

  remove(id: string) {
    return this.cropRepository.delete(id);
  }
}
