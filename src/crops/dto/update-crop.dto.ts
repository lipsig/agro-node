import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCropDto {
  @ApiPropertyOptional({ description: 'Nome da cultura', example: 'Milho' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'ID da fazenda', example: 'uuid-fazenda' })
  @IsString()
  @IsOptional()
  farmId?: string;

  @ApiPropertyOptional({ description: 'ID da safra', example: 'uuid-safra' })
  @IsString()
  @IsOptional()
  harvestId?: string;
}