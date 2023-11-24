import { useCallback, useState } from 'react'
import { UsuarioService } from '../services'
import { IUsuario } from '../interfaces'

export const useUsuario = () => {
    const [usuarios, setUsuarios] = useState<IUsuario[]>([])

    const getAllUsuarios = useCallback(async () => {
        const { status, data } = await UsuarioService.getAllUsuarios()

        if (status !== 200) {
            throw new Error()
        }

        setUsuarios(data)
    }, [])


    return{
        usuarios,
        getAllUsuarios
    }
    
}