import { useCallback, useState } from 'react'
import { EquipeService, UsuarioService } from '../services'
import { IEquipe, IUsuario } from '../interfaces'
import { useUsuario } from '.'

export const useEquipe = () => {
    const [equipes, setEquipes] = useState<IEquipe[]>([])
    const [equipe, setEquipe] = useState<IEquipe>()
    const [participantes, setParticipantes] = useState<IUsuario[]>([])

    const getAllEquipes = useCallback(async () => {
        const { status, data } = await EquipeService.getAllEquipes()

        if (status !== 200) {
            throw new Error()
        }

        setEquipes(data)
    }, [])

    const getEquipeId = useCallback(async (id: number) => {
        const { status, data } = await EquipeService.getEquipeId(id)

        if (status !== 200) {
            throw new Error()
        }

        setEquipe(data)
    }, [])

    return {
        equipes, equipe, participantes, getAllEquipes, getEquipeId
    }

}