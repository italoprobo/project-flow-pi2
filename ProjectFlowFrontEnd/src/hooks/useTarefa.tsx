import { useCallback, useEffect, useState } from 'react'
import { TarefaService } from '../services'
import { ITarefa } from '../interfaces'

export const useTarefa = () => {
    const [tarefas, setTarefas] = useState<ITarefa[]>([])
    const [fourTarefas, setFourTarefas] = useState<ITarefa[]>([])
    const [tarefasOrdenadasPrioridade, setTarefasOrdenadasPrioridade] = useState<ITarefa[]>([])

    const getAllTarefas = useCallback(async () => {
        const { status, data } = await TarefaService.getAllTarefas()

        if (status !== 200) {
            throw new Error()
        }

        setTarefas(data)
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
        fourTarefas,
        tarefasOrdenadasPrioridade,
        getAllTarefas,
        get4Tarefas,
        getTarefasOrdenadasPrioridade
    }

}