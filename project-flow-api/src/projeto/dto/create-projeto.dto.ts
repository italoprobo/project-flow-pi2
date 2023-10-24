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
    nome: string;

    @IsString()
    @MinLength(2, { message: 'Descrição deve ter ao menos 2 caracteres' })
    descricao: string;

    @IsNotEmpty()
    @IsDate()
    dt_inicio: Date;
  
    @IsDate()
    dt_final: Date;
}
