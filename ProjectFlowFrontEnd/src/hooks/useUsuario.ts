import { useCallback, useState } from 'react'
import { UsuarioService } from '../services'
import { IUsuario } from '../interfaces'

export const useUsuario = () => {
    const [usuarios, setUsuarios] = useState<IUsuario[]>([])
    const [usuario, setUsuario] = useState<IUsuario>()

    const getAllUsuarios = useCallback(async () => {
        const { status, data } = await UsuarioService.getAllUsuarios()

        if (status !== 200) {
            throw new Error()
        }

        setUsuarios(data)
    }, [])


    const getUsuarioById = useCallback(async (id: number) => {
        const { status, data } = await UsuarioService.viewUser(id)

        if (status !== 200) {
            throw new Error()
        }

        setUsuario(data)
    }, [])


    return{
        usuarios,
        usuario,
        getAllUsuarios,
        getUsuarioById
    }
    
}