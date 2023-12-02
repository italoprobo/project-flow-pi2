import { useCallback, useState } from 'react'
import { Usuario_EquipeService } from '../services'
import { IUsuario_Equipe } from '../interfaces'

export const useUsuario_Equipe = () => {
    const [usuario_equipe, setUsuario_equipe] = useState<IUsuario_Equipe[]>([])

    const findAllUser_Team = useCallback(async () => {
        const { status, data } = await Usuario_EquipeService.findAllUser_Team()

        if (status !== 200) {
            throw new Error()
        }

        setUsuario_equipe(data)
    }, [])


    return {
        usuario_equipe, findAllUser_Team
    }

}