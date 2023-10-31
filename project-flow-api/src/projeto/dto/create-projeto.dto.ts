import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsDate,
    MinLength,
  } from 'class-validator';

export class CreateProjetoDto {


    @IsString()
    @MinLength(2, { message: 'Nome deve ter ao menos 2 caracteres' })
    @IsNotEmpty()
    @ApiProperty()
    nome: string;

    @IsString()
    @MinLength(2, { message: 'Descrição deve ter ao menos 2 caracteres' })
    @ApiProperty()
    descricao: string;

    @IsNotEmpty()
    @IsDate()
    @ApiProperty()
    dt_inicio: Date;
  
    @IsDate()
    @ApiProperty()
    dt_final: Date;
}
