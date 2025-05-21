import { PartialType } from '@nestjs/mapped-types';
import { CreateFarmDto } from './create-farm.dto';

// Os decorators do CreateFarmDto já são herdados
export class UpdateFarmDto extends PartialType(CreateFarmDto) {}
