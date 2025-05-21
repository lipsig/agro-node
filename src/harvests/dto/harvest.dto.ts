import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHarvestDto {
  @ApiProperty({ description: 'Nome da safra', example: 'Safra 2023' })
  name: string;

  @ApiProperty({ description: 'ID da fazenda', example: 'uuid-fazenda' })
  farmId: string;
}

export class UpdateHarvestDto {
  @ApiPropertyOptional({ description: 'Nome da safra', example: 'Safra 2024' })
  name?: string;

  @ApiPropertyOptional({ description: 'ID da fazenda', example: 'uuid-fazenda' })
  farmId?: string;
}
