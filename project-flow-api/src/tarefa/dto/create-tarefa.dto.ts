import {
  IsAlphanumeric,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateTarefaDto {

  @PrimaryGeneratedColumn()
  id: number;

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
  @ApiProperty()
  dt_inicio: Date;

  @ApiProperty()
  dt_final: Date;

  @IsNotEmpty()
  @ApiProperty()
  tempo_previsto: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  importancia: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isDone: boolean

  @IsNumber()
  @IsNotEmpty()
  ProjetoId: number

  @IsNumber()
  @IsNotEmpty()
  EquipeId: number
}
