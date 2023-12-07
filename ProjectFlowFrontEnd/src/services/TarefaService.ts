import { Api } from "../providers/api";
import {ITarefa} from "../interfaces"

const getAllTarefas = () => Api.get<ITarefa[]>('v1/tarefa/')
const getTarefaId = (id: number) => Api.get<ITarefa>(`v1/tarefa/${id}`)
const getTarefaIdEquipe = (id: number) => Api.get<ITarefa[]>(`v1/tarefa/equipe/${id}`)
const updateTask = (TarefaAtualizada: ITarefa) => Api.patch<ITarefa>(`v1/tarefa/${TarefaAtualizada.id}`, TarefaAtualizada);
const removeTask = (id: number) => Api.delete<ITarefa>(`v1/tarefa/${id}`);

export const TarefaService = {
    getAllTarefas, getTarefaId, getTarefaIdEquipe, updateTask, removeTask
}