import {Equipe} from '../../../project-flow-api/src/equipe/entities/equipe.entity'
import {Projeto} from '../../../project-flow-api/src/projeto/entities/projeto.entity'
import {Usuario_equipe} from '../../../project-flow-api/src/usuario_equipe/entities/usuario_equipe.entity'

export interface IUsuario {
    id: number;
    nome: string;
    telefone: string;
    email: string;
    senha: string;
    cargo: string;
    equipeslideradas: Equipe[];
    projetosliderados: Projeto[];
    usuario_equipe?: Usuario_equipe[];
}