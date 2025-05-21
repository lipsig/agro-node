import { IsString, IsOptional } from 'class-validator';

export class UpdateCropDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  farmId?: string;

  @IsString()
  @IsOptional()
  harvestId?: string;
}