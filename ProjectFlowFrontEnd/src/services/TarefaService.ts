import { Api } from "../providers/api";
import {ITarefa} from "../interfaces"

const getAllTarefas = () => Api.get<ITarefa[]>('v1/tarefa/')
const getTarefaId = (id: number) => Api.get<ITarefa>(`v1/tarefa/${id}`)
const getTarefaIdEquipe = (id: number) => Api.get<ITarefa[]>(`v1/tarefa/equipe/${id}`)

export const TarefaService = {
    getAllTarefas, getTarefaId, getTarefaIdEquipe
}