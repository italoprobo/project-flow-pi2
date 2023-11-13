import { Api } from "../providers/api";
import {ITarefa} from "../interfaces"

const getAllTarefas = () => Api.get<ITarefa[]>('v1/tarefa/')

export const TarefaService = {
    getAllTarefas,
}