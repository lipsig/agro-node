import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProducerDto {
  @ApiProperty({
    description: 'CPF ou CNPJ do produtor (somente números, 11 ou 14 dígitos)',
    example: '12345678901',
  })
  @IsNotEmpty()
  @Matches(/^\d{11}$|^\d{14}$/, {
    message: 'O documento deve conter 11 (CPF) ou 14 (CNPJ) dígitos numéricos',
  })
  document: string;

  @ApiProperty({ description: 'Nome do produtor', example: 'João Silva' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[^\d]+$/, { message: 'O nome do produtor não pode conter números' })
  name: string;
}