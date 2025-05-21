import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Farm } from '../../farms/entities/farm.entity';
import { Harvest } from '../../harvests/entities/harvest.entity';

@Entity('crops')
export class Crop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Farm, (farm) => farm.crops)
  farm: Farm;

  @ManyToOne(() => Harvest, (harvest) => harvest.crops)
  harvest: Harvest;
}