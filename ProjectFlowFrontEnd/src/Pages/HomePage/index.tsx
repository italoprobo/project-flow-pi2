import "./styleHome.css"
import "./components/TarefaListaItem"
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useTarefa } from '../../hooks'
import { TarefaLista } from "./components/TarefaLista";
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext'
import { useEquipe } from "../../hooks/useEquipe";
import { useUsuario_Equipe } from "../../hooks/useUsuario_Equipe";
import { ITarefa } from "../../interfaces";

const HomePage = () => {

    const { user, signout } = useAuth()

    const { tarefas, getAllTarefas } = useTarefa()

    const { fourTarefas, get4Tarefas } = useTarefa()

    const displayNone = {
        display: 'none'
    };

    const [footerVisible, setFooterVisible] = useState(true);

    const toggleFooter = () => {
        setFooterVisible(!footerVisible);
    };

    const { equipes, getAllEquipes } = useEquipe()

    const { usuario_equipe, findAllUser_Team } = useUsuario_Equipe()

    useEffect(() => {
        getAllTarefas(),
            get4Tarefas(),
            getAllEquipes(),
            findAllUser_Team()
    }, [])

    let ids: number[] = []

    for (let linha of usuario_equipe) {
        if (linha.usuarioId === user?.id) {
            ids.push(linha.equipeId)
        }
    }

    let equipes_usuario = []

    for (let equipe of equipes) {
        for (let id of ids) {
            if (equipe.id === id) {
                equipes_usuario.push(equipe)
            }
        }
    }

    let tarefas_equipes_usuario: ITarefa[] = []

    for (let equipe of equipes_usuario) {
        for (let tarefa of tarefas) {
            if (tarefa.equipe.id === equipe.id) {
                tarefas_equipes_usuario.push(tarefa)
            }
        }
    }

    let tarefas_equipes_usuarioOrdenadas: ITarefa[] = []

    for (let tarefa of tarefas_equipes_usuario) {
        if (!tarefa.isDone && tarefa.importancia === 'Alta' && tarefas_equipes_usuarioOrdenadas.length < 4) {
            tarefas_equipes_usuarioOrdenadas.push(tarefa)
        }
    }

    for (let tarefa of tarefas_equipes_usuario) {
        if (!tarefa.isDone && tarefa.importancia === 'Média' && tarefas_equipes_usuarioOrdenadas.length < 4) {
            tarefas_equipes_usuarioOrdenadas.push(tarefa)
        }
    }

    for (let tarefa of tarefas_equipes_usuario) {
        if (!tarefa.isDone && tarefa.importancia === 'Baixa' && tarefas_equipes_usuarioOrdenadas.length < 4) {
            tarefas_equipes_usuarioOrdenadas.push(tarefa)
        }
    }

    for (let tarefa of tarefas_equipes_usuario) {
        if (tarefa.isDone && tarefa.importancia === 'Alta' && tarefas_equipes_usuarioOrdenadas.length < 4) {
            tarefas_equipes_usuarioOrdenadas.push(tarefa)
        }
    }

    for (let tarefa of tarefas_equipes_usuario) {
        if (tarefa.isDone && tarefa.importancia === 'Média' && tarefas_equipes_usuarioOrdenadas.length < 4) {
            tarefas_equipes_usuarioOrdenadas.push(tarefa)
        }
    }

    for (let tarefa of tarefas_equipes_usuario) {
        if (tarefa.isDone && tarefa.importancia === 'Baixa' && tarefas_equipes_usuarioOrdenadas.length < 4) {
            tarefas_equipes_usuarioOrdenadas.push(tarefa)
        }
    }

    return (
        <body>
            <header>
                {user?.cargo === "administrador" ?
                    <div className="head-content">
                        <div className="div_logo">
                            <Link to="/"><img src="../../../public/icon.png" alt="Logo" className="logo" /></Link>
                        </div>
                            <div className="botaoCadastro">
                                <Link to={"/cadastro"}><button className="btn-cad">cadastrar usuário</button></Link>
                            </div>
                        <div className="direita">
                            <div className="botaoSair">
                                <button className="btn-sair" onClick={signout}>Sair</button>
                            </div>
                        </div>
                    </div> :
                    <div className="head-content">
                    <div className="div_logo">
                        <Link to="/"><img src="../../../public/icon.png" alt="Logo" className="logo" /></Link>
                    </div>
                    <div className="direita">
                        <div className="botaoSair">
                            <button className="btn-sair" onClick={signout}>Sair</button>
                        </div>
                    </div>
                </div>
                }
            </header>
            <main>
                {tarefas_equipes_usuarioOrdenadas.length < 0 ?
                    <div className="div_saudacao">
                        <h1>Olá, {user?.nome}.</h1>
                        <p>Você ainda não possui tarefas</p>
                    </div> :
                    <><div className="div_saudacao">
                        <h1>Olá, {user?.nome}.</h1>
                        <p>Essas são suas próximas tarefas:</p>
                    </div>
                        <div className="div_lista_tarefas">
                            <TarefaLista tarefas={tarefas_equipes_usuarioOrdenadas} />
                        </div></>
                }
            </main>
            {
                footerVisible ?
                    <footer style={displayNone}>
                        <div className="footer-content">
                            <div className="menu">
                                <Link to="/projetos"><img src="../../../public/list_icon.png" alt="Lista" className="lista" /></Link>
                                <Link to="/tarefas"><img src="../../../public/calendar_icon.png" alt="Calendario" className="calendario" /></Link>
                                <Link to="/equipes"><img src="../../../public/team_icon.png" alt="Time" className="time" /></Link>
                            </div>
                        </div>
                    </footer> :
                    <footer>
                        <div className="footer-content">
                            <div className="botaoBarraAbaixar">
                                <button onClick={toggleFooter}><FaCircleArrowDown /></button>
                            </div>
                            <div className="menu">
                                <Link to="/projetos"><img src="../../../public/list_icon.png" alt="Lista" className="lista" /></Link>
                                <Link to="/tarefas"><img src="../../../public/calendar_icon.png" alt="Calendario" className="calendario" /></Link>
                                <Link to="/equipes"><img src="../../../public/team_icon.png" alt="Time" className="time" /></Link>
                            </div>
                        </div>
                    </footer>
            }
            {
                footerVisible ?
                    <div className="botaoBarraSubir">
                        <button onClick={toggleFooter}><FaCircleArrowUp /></button>
                    </div> :
                    <div className="botaoBarraSubir" style={displayNone}>
                        <button onClick={toggleFooter}><FaCircleArrowUp /></button>
                    </div>
            }
        </body >
    )
}

export default HomePage