import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Check } from 'typeorm';
import { Producer } from '../../producers/entities/producer.entity';
import { Crop } from '../../crops/entities/crop.entity';

@Entity('farms')
@Check(`"agricultural_area" + "vegetation_area" <= "total_area"`)
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column('float')
  total_area: number;

  @Column('float')
  agricultural_area: number;

  @Column('float')
  vegetation_area: number;

  @ManyToOne(() => Producer, (producer) => producer.farms, { onDelete: 'CASCADE' })
  producer: Producer;

  @OneToMany(() => Crop, (crop) => crop.farm, { cascade: true })
  crops: Crop[];
}
