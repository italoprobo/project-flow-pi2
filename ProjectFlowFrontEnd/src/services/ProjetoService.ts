import { Api } from "../providers/api";
import {IProjeto} from "../interfaces"

const getAllProjetos = () => Api.get<IProjeto[]>('v1/projeto/')
const getProjetoId = (id: string) => Api.get<IProjeto>(`v1/projeto/${id}`)

export const ProjetoService = {
    getAllProjetos, getProjetoId
}