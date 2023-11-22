import {Usuario} from '../../../project-flow-api/src/usuario/entities/usuario.entity'
import {Tarefa} from '../../../project-flow-api/src/tarefa/entities/tarefa.entity'
import {Equipe} from '../../../project-flow-api/src/equipe/entities/equipe.entity'

export interface IProjeto {
    id: number;
    nome: string;
    descricao: string;
    dt_inicio: Date;
    dt_final: Date;
    responsavel: Usuario;
    tarefas: Tarefa[];
    equipes: Equipe[];
    project: Promise<Usuario>;
}