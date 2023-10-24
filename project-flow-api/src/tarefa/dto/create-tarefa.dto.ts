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

export class CreateTarefaDto {

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
  
    @IsNotEmpty()
    @IsDate()
    tempo_previsto: Date;

    @IsEnum([Importancia.BAIXA, Importancia.MEDIA, Importancia.ALTA])
    importancia: Importancia;

    @IsNotEmpty()
    @IsIn([0,1])
    isDone: number
}
