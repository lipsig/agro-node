import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducersController } from './producer.controller';
import { ProducersService } from './producer.service';
import { Producer } from './entities/producer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producer])],
  controllers: [ProducersController],
  providers: [ProducersService],
})
export class ProducersModule {}
