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

    const salvarEdicaoNomeEquipe = async (nomeEquipeEditado: string, idEquipe: number) => {
        getEquipeId(idEquipe)

        if (equipe) {
            try {
                setEquipe({
                    ...equipe,
                    nome: nomeEquipeEditado,
                });
                
                await EquipeService.updateEquipe({
                    id: equipe.id,
                    nome: nomeEquipeEditado,
                    funcao: equipe.funcao,
                    responsavelId: equipe.responsavel.id,
                    projetoId: equipe.projeto.id
                });
            } catch (error: any) {
                console.error('Erro ao alterar o Nome da equipe', error.message);
            }
        }
    };

    const salvarEdicaoFuncaoEquipe = async (funcaoEquipeEditado: string, idEquipe: number) => {
        getEquipeId(idEquipe)

        if (equipe) {
            try {
                setEquipe({
                    ...equipe,
                    funcao: funcaoEquipeEditado,
                });
                
                await EquipeService.updateEquipe({
                    id: equipe.id,
                    nome: equipe.nome,
                    funcao: funcaoEquipeEditado,
                    responsavelId: equipe.responsavel.id,
                    projetoId: equipe.projeto.id
                });
            } catch (error: any) {
                console.error('Erro ao alterar a função da equipe', error.message);
            }
        }
    };

    return {
        equipes, equipe, participantes, getAllEquipes, getEquipeId, salvarEdicaoNomeEquipe, salvarEdicaoFuncaoEquipe
    }

}