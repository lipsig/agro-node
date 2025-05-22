import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateHarvestDto {
  @ApiProperty({ description: 'Nome da safra', example: 'Safra 2023' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'ID da fazenda', example: 'uuid-fazenda' })
  @IsString()
  @IsNotEmpty()
  farmId: string;
}

export class UpdateHarvestDto {
  @ApiPropertyOptional({ description: 'Nome da safra', example: 'Safra 2024' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: 'ID da fazenda', example: 'uuid-fazenda' })
  @IsString()
  @IsOptional()
  farmId?: string;
}
