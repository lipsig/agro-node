import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Farm } from '../../farms/entities/farm.entity';

@Entity('producers')
export class Producer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  document: string; // CPF or CNPJ

  @Column()
  name: string;

  @OneToMany(() => Farm, (farm) => farm.producer, { cascade: true })
  farms: Farm[];
}