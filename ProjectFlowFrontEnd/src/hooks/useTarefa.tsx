import { useCallback, useEffect, useState } from 'react'
import { TarefaService } from '../services'
import { ITarefa } from '../interfaces'

export const useTarefa = () => {
    const [tarefas, setTarefas] = useState<ITarefa[]>([])
    const [tarefasEquipe, setTarefasEquipe] = useState<ITarefa[]>([])
    const [tarefa, setTarefa] = useState<ITarefa>()
    const [fourTarefas, setFourTarefas] = useState<ITarefa[]>([])
    const [tarefasOrdenadasPrioridade, setTarefasOrdenadasPrioridade] = useState<ITarefa[]>([])

    const mudarStatus = async (idTarefa: number) => {
        getTarefaId(idTarefa)

        if (tarefa) {
            try {

                await TarefaService.updateTask({
                    id: tarefa.id,
                    nome: tarefa.nome,
                    descricao: tarefa.nome,
                    dt_inicio: tarefa.dt_inicio,
                    dt_final: tarefa.dt_final,
                    tempo_previsto: tarefa.tempo_previsto,
                    importancia: tarefa.importancia,
                    isDone: !tarefa.isDone,
                    projeto: tarefa.projeto,
                    equipe: tarefa.equipe
                });
            } catch (error: any) {
                console.error('Erro ao alterar o Nome do projeto', error.message);
            }
        }
    };

    const getAllTarefas = useCallback(async () => {
        const { status, data } = await TarefaService.getAllTarefas()

        if (status !== 200) {
            throw new Error()
        }

        setTarefas(data)
    }, [])

    const getTarefaId = useCallback(async (id: number) => {
        const { status, data } = await TarefaService.getTarefaId(id)

        if (status !== 200) {
            throw new Error()
        }

        setTarefa(data)
    }, [])

    const getTarefaIdEquipe = useCallback(async (id: number) => {
        const { status, data } = await TarefaService.getTarefaIdEquipe(id)

        if (status !== 200) {
            throw new Error()
        }

        setTarefasEquipe(data)
    }, [])

    const get4Tarefas = useCallback(async () => {
        const { status, data } = await TarefaService.getAllTarefas()

        if (status !== 200) {
            throw new Error()
        }

        data.splice(4)

        setFourTarefas(data)
    }, [])

    const getTarefasOrdenadasPrioridade = useCallback(async () => {
        const { status, data } = await TarefaService.getAllTarefas()

        if (status !== 200) {
            throw new Error()
        }

        const dataOrdenada: ITarefa[] = []

        for (let tarefa of data) {
            if (!tarefa.isDone && tarefa.importancia === 'Alta') {
                dataOrdenada.push(tarefa)
            }
        }

        for (let tarefa of data) {
            if (!tarefa.isDone && tarefa.importancia === 'Média') {
                dataOrdenada.push(tarefa)
            }
        }

        for (let tarefa of data) {
            if (!tarefa.isDone && tarefa.importancia === 'Baixa') {
                dataOrdenada.push(tarefa)
            }
        }

        for (let tarefa of data) {
            if (tarefa.isDone && tarefa.importancia === 'Alta') {
                dataOrdenada.push(tarefa)
            }
        }

        for (let tarefa of data) {
            if (tarefa.isDone && tarefa.importancia === 'Média') {
                dataOrdenada.push(tarefa)
            }
        }

        for (let tarefa of data) {
            if (tarefa.isDone && tarefa.importancia === 'Baixa') {
                dataOrdenada.push(tarefa)
            }
        }

        setTarefasOrdenadasPrioridade(dataOrdenada)
    }, [])

    return {
        tarefas,
        tarefasEquipe,
        tarefa,
        fourTarefas,
        tarefasOrdenadasPrioridade,
        getAllTarefas,
        get4Tarefas,
        getTarefasOrdenadasPrioridade,
        getTarefaId,
        getTarefaIdEquipe,
        mudarStatus
    }

}