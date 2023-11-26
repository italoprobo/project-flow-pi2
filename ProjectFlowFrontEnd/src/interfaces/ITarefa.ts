import {Projeto} from '../../../project-flow-api/src/projeto/entities/projeto.entity'
import {Equipe} from '../../../project-flow-api/src/equipe/entities/equipe.entity'

export interface ITarefa {
    id: number;
    nome: string;
    descricao: string;
    dt_inicio: Date;
    dt_final: Date;
    tempo_previsto: number;
    importancia: string;
    isDone: boolean;
    projeto: Projeto
    equipe: Equipe
}