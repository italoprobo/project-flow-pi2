import { Api } from "../providers/api";
import {ITarefa} from "../interfaces"

const getAllTarefas = () => Api.get<ITarefa[]>('v1/projeto/')

export const TarefaService = {
    getAllTarefas,
}