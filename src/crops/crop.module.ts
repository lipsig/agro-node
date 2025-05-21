import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crop } from './entities/crop.entity';
import { CropService } from './crop.service';
import { CropController } from './crop.controller';
import { Farm } from '../farms/entities/farm.entity';
import { Harvest } from '../harvests/entities/harvest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Crop, Farm, Harvest])],
  controllers: [CropController],
  providers: [CropService],
})
export class CropModule {}
