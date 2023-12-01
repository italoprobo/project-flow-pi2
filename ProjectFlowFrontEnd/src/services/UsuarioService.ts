import { Api } from "../providers/api";
import {IUsuario} from "../interfaces"

const getAllUsuarios = () => Api.get<IUsuario[]>('v1/usuario')
const viewUser = (id: number) => Api.get<IUsuario>(`v1/usuario/${id}`)

export const UsuarioService = {
    getAllUsuarios, viewUser
}