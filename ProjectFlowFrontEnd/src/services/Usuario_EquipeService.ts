import { Api } from "../providers/api";
import {IUsuario_Equipe} from "../interfaces"

const findAllUser_Team = () => Api.get<IUsuario_Equipe[]>('v1/usuario_equipe')

export const Usuario_EquipeService = {
    findAllUser_Team
}