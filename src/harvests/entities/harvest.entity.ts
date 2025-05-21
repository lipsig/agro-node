import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Crop } from '../../crops/entities/crop.entity';
import { Farm } from '../../farms/entities/farm.entity';

@Entity('harvests')
export class Harvest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Safra 2021

  @OneToMany(() => Crop, (crop) => crop.harvest)
  crops: Crop[];

  @ManyToOne(() => Farm, (farm) => farm.harvests)
  farm: Farm;
}
