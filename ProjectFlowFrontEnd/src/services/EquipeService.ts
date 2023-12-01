import { Api } from "../providers/api";
import {IEquipe} from "../interfaces"

const getAllEquipes = () => Api.get<IEquipe[]>('v1/equipe/')
const getEquipeId = (id: number) => Api.get<IEquipe>(`v1/equipe/${id}`)

export const EquipeService = {
    getAllEquipes, getEquipeId
}