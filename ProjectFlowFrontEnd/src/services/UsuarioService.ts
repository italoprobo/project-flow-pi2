import { Api } from "../providers/api";
import {IUsuario} from "../interfaces"

const getAllUsuarios = () => Api.get<IUsuario[]>('v1/usuario')

export const UsuarioService = {
    getAllUsuarios,
}