import { ApiProperty } from '@nestjs/swagger';
import {
    IsAlphanumeric,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
import { Equipe } from 'src/equipe/entities/equipe.entity';
import { Projeto } from 'src/projeto/entities/projeto.entity';


export class CreateUsuarioDto {

    @IsString()
    @MinLength(2, { message: 'Nome deve ter ao menos 2 caracteres' })
    @IsNotEmpty()
    @ApiProperty()
    nome: string;

    @IsNotEmpty()
    @MinLength(8, { message: 'O telefone deve ter ao menos 8 caracteres.' })
    @ApiProperty()
    telefone: string;

    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    senha: string;
    
    @IsNotEmpty()
    @ApiProperty()
    cargo: string;

    equipeslideradas: Equipe[];
    
    projetosliderados: Projeto[];
}
