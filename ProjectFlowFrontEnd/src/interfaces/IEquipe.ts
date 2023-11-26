import {Usuario} from '../../../project-flow-api/src/usuario/entities/usuario.entity'
import {Tarefa} from '../../../project-flow-api/src/tarefa/entities/tarefa.entity'
import { Usuario_equipe } from '../../../project-flow-api/src/usuario_equipe/entities/usuario_equipe.entity'
import { Projeto } from '../../../project-flow-api/src/projeto/entities/projeto.entity'

export interface IEquipe {
    id: number
    nome: string
    funcao: string
    responsavel: Usuario
    projeto: Projeto
    usuario_equipe?: Usuario_equipe[]
    tarefas: Tarefa[]
}