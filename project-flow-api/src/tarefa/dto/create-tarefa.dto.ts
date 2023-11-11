import {
    IsAlphanumeric,
    IsDate,
    IsEmail,
    IsEnum,
    IsIn,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
import { Importancia } from '../entities/tarefa.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTarefaDto {

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
    // @IsDate()
    @ApiProperty()
    dt_inicio: Date;
  
    // @IsDate()
    @ApiProperty()
    dt_final: Date;
  
    @IsNotEmpty()
    // @IsDate()
    @ApiProperty()
    tempo_previsto: Date;

    @IsEnum([Importancia.BAIXA, Importancia.MEDIA, Importancia.ALTA])
    @ApiProperty()
    importancia: Importancia;

    @IsNotEmpty()
    @IsIn([0,1])
    @ApiProperty()
    isDone: number
}
