import { IsArray, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { Tarefa } from 'src/tarefa/entities/tarefa.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

export class CreateEquipeDto {

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @MinLength(2, { message: 'Name must have at least 2 characters.' })
    funcao: string;

    @IsNumber()
    @IsNotEmpty()
    responsavelId: number;

    @IsNumber()
    @IsNotEmpty()
    projetoId: number;

    @IsArray()
    membros: Usuario[] = [];

    @IsArray()
    tarefas: Tarefa[] = [];
}
