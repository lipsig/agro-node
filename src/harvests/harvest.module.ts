import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Harvest } from './entities/harvest.entity';
import { HarvestService } from './harvest.service';
import { HarvestController } from './harvest.controller';
import { Farm } from '../farms/entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Harvest, Farm])],
  controllers: [HarvestController],
  providers: [HarvestService],
})
export class HarvestModule {}
