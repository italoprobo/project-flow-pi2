import { useCallback, useState } from 'react'
import { TarefaService } from '../services'
import { ITarefa } from '../interfaces'

export const useTarefa = () => {
    const [tarefas, setTarefas] = useState<ITarefa[]>([])

    const getAllTarefas = useCallback(async () => {
        const { status, data } = await TarefaService.getAllTarefas()

        if (status !== 200) {
            throw new Error()
        }

        data.splice(4)

        setTarefas(data)
    }, [])

    return{
        tarefas,
        getAllTarefas,
    }
    
}