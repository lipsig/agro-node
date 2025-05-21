import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateProducerDto {
  @IsNotEmpty()
  @Matches(/^\d{11}$|^\d{14}$/, {
    message: 'O documento deve conter 11 (CPF) ou 14 (CNPJ) dígitos numéricos',
  })
  document: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}