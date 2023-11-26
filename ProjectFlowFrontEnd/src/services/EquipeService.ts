import { Api } from "../providers/api";
import {IEquipe} from "../interfaces"

const getAllEquipes = () => Api.get<IEquipe[]>('v1/equipe/')

export const EquipeService = {
    getAllEquipes,
}