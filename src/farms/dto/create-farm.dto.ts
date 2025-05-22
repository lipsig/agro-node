import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmDto {
  @ApiProperty({ description: 'Nome da fazenda', example: 'Fazenda Boa Vista' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Cidade da fazenda', example: 'Uberlândia' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[^\d]+$/, { message: 'O nome da cidade não pode conter números' })
  city: string;

  @ApiProperty({ description: 'Estado da fazenda', example: 'MG' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ description: 'Área total em hectares', example: 100 })
  @IsNumber()
  total_area: number;

  @ApiProperty({ description: 'Área agricultável em hectares', example: 60 })
  @IsNumber()
  agricultural_area: number;

  @ApiProperty({ description: 'Área de vegetação em hectares', example: 40 })
  @IsNumber()
  vegetation_area: number;

  @ApiProperty({ description: 'ID do produtor', example: 'uuid-produtor' })
  @IsString()
  producerId: string;
}
