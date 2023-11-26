import { useCallback, useState } from 'react'
import { EquipeService } from '../services'
import { IEquipe } from '../interfaces'

export const useEquipe = () => {
    const [equipes, setEquipes] = useState<IEquipe[]>([])

    const getAllEquipes = useCallback(async () => {
        const { status, data } = await EquipeService.getAllEquipes()

        if (status !== 200) {
            throw new Error()
        }

        setEquipes(data)
    }, [])

    return{
        equipes, getAllEquipes
    }
    
}