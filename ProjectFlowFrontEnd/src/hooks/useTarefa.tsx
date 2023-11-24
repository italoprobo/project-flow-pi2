import { useCallback, useState } from 'react'
import { TarefaService } from '../services'
import { ITarefa } from '../interfaces'

export const useTarefa = () => {
    const [tarefas, setTarefas] = useState<ITarefa[]>([])
    const [fourTarefas, setFourTarefas] = useState<ITarefa[]>([])

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

    return{
        tarefas,
        fourTarefas,
        getAllTarefas,
        get4Tarefas
    }
    
}