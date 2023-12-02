import { useCallback, useState } from 'react'
import { ProjetoService } from '../services'
import { IProjeto } from '../interfaces'

export const useProjeto = () => {
    const [projetos, setProjetos] = useState<IProjeto[]>([])
    const [projeto, setProjeto] = useState<IProjeto>()

    const getAllProjetos = useCallback(async () => {
        const { status, data } = await ProjetoService.getAllProjetos()

        if (status !== 200) {
            throw new Error()
        }

        setProjetos(data)
    }, [])

    const getProjetoId = async (id: string) => {
        const { status, data } = await ProjetoService.getProjetoId(id)

        if (status !== 200) {
            throw new Error()
        }

        setProjeto(data)
    }

    const salvarEdicaoNome = async (nomeProjetoEditado: string) => {
        if (projeto) {

            setProjeto({
                ...projeto,
                nome: nomeProjetoEditado,
            });

            try {
                await ProjetoService.updateProjeto({
                    ...projeto,
                    nome: nomeProjetoEditado,
                });
            } catch (error: any) {
                console.error('Erro ao alterar o Nome do projeto', error.message);
            }
        }
    };

    return{
        projetos,
        projeto,
        getAllProjetos,
        getProjetoId,
        salvarEdicaoNome
    }
    
}