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
    

    const salvarEdicaoDataIncio = async (DataInicioProjetoEditado: string) => {
        if (projeto) {
            const dataInicio = new Date(DataInicioProjetoEditado);
            setProjeto({
                ...projeto,
                dt_inicio: dataInicio,
            });

            try {
                await ProjetoService.updateProjeto({
                    ...projeto,
                    dt_inicio: dataInicio,
                });
            } catch (error: any) {
                console.error('Erro ao alterar a data de inicio do projeto', error.message);
            }
        }
    };
    
    

    const salvarEdicaoDataFinal = async (DataFinalProjetoEditado: string) => {
        if (projeto) {
            const dataFinal = new Date(DataFinalProjetoEditado)
            setProjeto({
                ...projeto,
                dt_final: dataFinal,
            });

            try {
                await ProjetoService.updateProjeto({
                    ...projeto,
                    dt_final: dataFinal,
                });
            } catch (error: any) {
                console.error('Erro ao alterar a data de conclusao do projeto', error.message);
            }
        }
    };
    

    return{
        projetos,
        projeto,
        getAllProjetos,
        getProjetoId,
        salvarEdicaoNome,
        salvarEdicaoDataIncio,
        salvarEdicaoDataFinal
    }
    
}