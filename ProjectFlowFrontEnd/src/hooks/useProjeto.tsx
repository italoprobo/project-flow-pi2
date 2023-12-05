import { useCallback, useState } from 'react'
import { ProjetoService } from '../services'
import { IProjeto, IUpdateProjeto } from '../interfaces'

export const useProjeto = () => {
    const [projetos, setProjetos] = useState<IProjeto[]>([])
    const [projeto, setProjeto] = useState<IProjeto>()
    const [updateProjeto, setUpdateProjeto] = useState<IUpdateProjeto>()

    const getAllProjetos = useCallback(async () => {
        const { status, data } = await ProjetoService.getAllProjetos()

        if (status !== 200) {
            throw new Error()
        }

        setProjetos(data)
    }, [])

    const getProjetoId = async (id: number) => {
        const { status, data } = await ProjetoService.getProjetoId(id)

        if (status !== 200) {
            throw new Error()
        }

        setProjeto(data)
    }

    const salvarEdicaoNome = async (nomeProjetoEditado: string, idProjeto: number) => {
        getProjetoId(idProjeto)

        if (projeto) {
            try {
                setProjeto({
                    ...projeto,
                    nome: nomeProjetoEditado,
                });

                await ProjetoService.updateProjeto({
                    id: projeto.id,
                    nome: nomeProjetoEditado,
                    descricao: projeto.descricao,
                    dt_inicio: projeto.dt_inicio,
                    dt_final: projeto.dt_final,
                    responsavelId: projeto.responsavel.id
                });
            } catch (error: any) {
                console.error('Erro ao alterar o Nome do projeto', error.message);
            }
        }
    };



    const salvarEdicaoDataIncio = async (dataInicioProjetoEditado: string, idProjeto: number) => {
        await getProjetoId(idProjeto)

        if (projeto) {
            const dataInicio = new Date(dataInicioProjetoEditado);

            setProjeto({
                id: projeto.id,
                nome: projeto.nome,
                descricao: projeto.descricao,
                dt_inicio: dataInicio,
                dt_final: projeto.dt_final,
                responsavel: projeto.responsavel,
                tarefas: projeto.tarefas,
                equipes: projeto.equipes,
                project: projeto.project
            });

            try {
                await ProjetoService.updateProjeto({
                    id: projeto.id,
                    nome: projeto.nome,
                    descricao: projeto.descricao,
                    dt_inicio: dataInicio,
                    dt_final: projeto.dt_final,
                    responsavelId: projeto.responsavel.id
                });
            } catch (error: any) {
                console.error('Erro ao alterar a data de inicio do projeto', error.message);
            }
        }
    };

    const salvarEdicaoDataFinal = async (dataFinalProjetoEditado: string, idProjeto: number) => {
        await getProjetoId(idProjeto)

        if (projeto) {
            const dataFinal = new Date(dataFinalProjetoEditado);

            setProjeto({
                id: projeto.id,
                nome: projeto.nome,
                descricao: projeto.descricao,
                dt_inicio: projeto.dt_inicio,
                dt_final: dataFinal,
                responsavel: projeto.responsavel,
                tarefas: projeto.tarefas,
                equipes: projeto.equipes,
                project: projeto.project
            });

            try {
                await ProjetoService.updateProjeto({
                    id: projeto.id,
                    nome: projeto.nome,
                    descricao: projeto.descricao,
                    dt_inicio: projeto.dt_inicio,
                    dt_final: dataFinal,
                    responsavelId: projeto.responsavel.id
                });
            } catch (error: any) {
                console.error('Erro ao alterar a data de inicio do projeto', error.message);
            }
        }
    };


    return {
        projetos,
        projeto,
        getAllProjetos,
        getProjetoId,
        salvarEdicaoNome,
        salvarEdicaoDataIncio,
        salvarEdicaoDataFinal
    }

}