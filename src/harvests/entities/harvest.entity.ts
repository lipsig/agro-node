import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Crop } from '../../crops/entities/crop.entity';

@Entity('harvests')
export class Harvest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Safra 2021

  @OneToMany(() => Crop, (crop) => crop.harvest)
  crops: Crop[];
}
