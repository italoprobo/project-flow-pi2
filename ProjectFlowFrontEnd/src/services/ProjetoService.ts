import { Api } from "../providers/api";
import {IProjeto, IUpdateProjeto} from "../interfaces"

const getAllProjetos = () => Api.get<IProjeto[]>('v1/projeto/')
const getProjetoId = (id: number) => Api.get<IProjeto>(`v1/projeto/${id}`)
const updateProjeto = (projetoAtualizado: IUpdateProjeto) => Api.patch<IUpdateProjeto>(`v1/projeto/${projetoAtualizado.id}`, projetoAtualizado);

export const ProjetoService = {
    getAllProjetos, getProjetoId, updateProjeto
}