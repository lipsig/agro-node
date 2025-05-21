import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCropDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  farmId: string;


  @IsString()
  @IsNotEmpty()
  harvestId: string;
}
