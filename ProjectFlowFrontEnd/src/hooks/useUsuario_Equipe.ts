import { useCallback, useState } from 'react'
import { Usuario_EquipeService } from '../services'
import { IEquipe, IUsuario, IUsuario_Equipe } from '../interfaces'
import { Usuario } from '../../../project-flow-api/src/usuario/entities/usuario.entity'

export const useUsuario_Equipe = () => {
    const [usuario_equipe, setUsuario_equipe] = useState<IUsuario_Equipe[]>([])
    const [membros, setMembros] = useState<Usuario[]>([])

    const findAllUser_Team = useCallback(async () => {
        const { status, data } = await Usuario_EquipeService.findAllUser_Team()

        if (status !== 200) {
            throw new Error()
        }

        setUsuario_equipe(data)
    }, [])

    const findMember_Team = useCallback(async (idEquipe: number) => {
        const { status } = await Usuario_EquipeService.findAllUser_Team()

        if (status !== 200) {
            throw new Error()
        }

        let membros: Usuario[] = []

        for (let equipe of usuario_equipe) {
            if (equipe.equipeId === idEquipe && equipe.usuario) {
                membros.push(equipe.usuario)
            }
        }

        setMembros(membros)
    }, [])


    return {
        usuario_equipe, membros, findAllUser_Team, findMember_Team
    }

}