import { Api } from "../providers/api";
import {IEquipe} from "../interfaces"
import { IUpdateEquipe } from "../interfaces/IUpdateEquipe";

const getAllEquipes = () => Api.get<IEquipe[]>('v1/equipe/')
const getEquipeId = (id: number) => Api.get<IEquipe>(`v1/equipe/${id}`)
const updateEquipe = (equipeAtualizada: IUpdateEquipe) => Api.patch<IUpdateEquipe>(`v1/equipe/${equipeAtualizada.id}`, equipeAtualizada);

export const EquipeService = {
    getAllEquipes, getEquipeId, updateEquipe
}