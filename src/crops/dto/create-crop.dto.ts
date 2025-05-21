import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCropDto {
  @ApiProperty({ description: 'Nome da cultura', example: 'Soja' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'ID da fazenda', example: 'uuid-fazenda' })
  @IsString()
  @IsNotEmpty()
  farmId: string;

  @ApiProperty({ description: 'ID da safra', example: 'uuid-safra' })
  @IsString()
  @IsNotEmpty()
  harvestId: string;
}
