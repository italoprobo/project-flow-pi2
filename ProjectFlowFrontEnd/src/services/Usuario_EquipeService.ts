import { Api } from "../providers/api";
import {IUsuario_Equipe} from "../interfaces"

const findAllUser_Team = () => Api.get<IUsuario_Equipe[]>('v1/usuario_equipe')
const removeUser_Team = (id: number) => Api.delete(`v1/usuario_equipe/${id}`)

export const Usuario_EquipeService = {
    findAllUser_Team, removeUser_Team
}