import { PartialType } from '@nestjs/mapped-types';
import { CreateProducerDto } from './create-producer.dto';

// Os decorators do CreateProducerDto já são herdados
export class UpdateProducerDto extends PartialType(CreateProducerDto) {}