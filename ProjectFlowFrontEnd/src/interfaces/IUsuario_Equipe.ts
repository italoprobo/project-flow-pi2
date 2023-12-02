import {Usuario} from '../../../project-flow-api/src/usuario/entities/usuario.entity'
import { Equipe } from '../../../project-flow-api/src/equipe/entities/equipe.entity'

export interface IUsuario_Equipe {
    id: number
    usuarioId: number
    equipeId: number
    usuario?: Usuario
    equipe?: Equipe
}