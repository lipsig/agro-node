import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFarmDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  total_area: number;

  @IsNumber()
  agricultural_area: number;

  @IsNumber()
  vegetation_area: number;

  @IsString()
  producerId: string;
}
