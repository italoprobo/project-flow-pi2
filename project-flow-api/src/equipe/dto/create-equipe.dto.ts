import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator'
import { Projeto } from 'src/projeto/entities/projeto.entity'
import { Tarefa } from 'src/tarefa/entities/tarefa.entity'
import { Usuario } from 'src/usuario/entities/usuario.entity'

export class CreateEquipeDto {

    @IsString()
    @IsNotEmpty()
    nome: string

    @IsString()
    @MinLength(2, { message: 'Name must have at least 2 characters.' })
    funcao: string

    @IsArray()
    @IsNotEmpty()
    membros: Usuario[]

    @IsNotEmpty()
    responsavel: Usuario

    @IsNotEmpty()
    projeto: Projeto

    @IsArray()
    @IsNotEmpty()
    tarefas: Tarefa[]
}
