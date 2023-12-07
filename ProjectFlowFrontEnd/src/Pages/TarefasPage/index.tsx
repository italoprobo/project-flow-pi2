import "../HomePage/styleHome.css";
import { useEffect, useState } from "react";
import { useTarefa } from "../../hooks";
import { TarefaLista } from "./components/TarefaLista/"
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useUsuario_Equipe } from "../../hooks/useUsuario_Equipe";
import { useAuth } from "../../contexts/AuthContext";
import { useEquipe } from "../../hooks/useEquipe";
import { Tarefa } from "../../../../project-flow-api/src/tarefa/entities/tarefa.entity";

const TarefasPage = () => {
    const { tarefas, getAllTarefas } = useTarefa()
    const { signout, user } = useAuth()

    useEffect(() => {
        getAllTarefas()
    }, [])

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
        getAllEquipes(),
            findAllUser_Team()
    }, [])


    let ids = []

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

    let tarefas_equipes_usuario: Tarefa[] = []

    for (let equipe of equipes_usuario) {
        for (let tarefa of tarefas) {
            if (tarefa.equipe.id === equipe.id) {
                tarefas_equipes_usuario.push(tarefa)
            }
        }
    }

    let tarefas_equipes_usuarioOrdenadas: Tarefa[] = []

    for (let tarefa of tarefas_equipes_usuario) {
        if (!tarefa.isDone && tarefa.importancia === 'Alta') {
            tarefas_equipes_usuarioOrdenadas.push(tarefa)
        }
    }

    for (let tarefa of tarefas_equipes_usuario) {
        if (!tarefa.isDone && tarefa.importancia === 'Média') {
            tarefas_equipes_usuarioOrdenadas.push(tarefa)
        }
    }

    for (let tarefa of tarefas_equipes_usuario) {
        if (!tarefa.isDone && tarefa.importancia === 'Baixa') {
            tarefas_equipes_usuarioOrdenadas.push(tarefa)
        }
    }

    for (let tarefa of tarefas_equipes_usuario) {
        if (tarefa.isDone && tarefa.importancia === 'Alta') {
            tarefas_equipes_usuarioOrdenadas.push(tarefa)
        }
    }

    for (let tarefa of tarefas_equipes_usuario) {
        if (tarefa.isDone && tarefa.importancia === 'Média') {
            tarefas_equipes_usuarioOrdenadas.push(tarefa)
        }
    }

    for (let tarefa of tarefas_equipes_usuario) {
        if (tarefa.isDone && tarefa.importancia === 'Baixa') {
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
                <div className="div_frase">
                    <p>Lista de tarefas</p>
                </div>
                {tarefas_equipes_usuario.length > 0 ?
                    <div className="div_lista_tarefas">
                        <p className="h1">Essas são todas as suas tarefas:</p>
                        <TarefaLista tarefas={tarefas_equipes_usuarioOrdenadas} />
                    </div> :
                    <p>Lista de tarefas vazia</p>
                }
            </main>
            {footerVisible ?
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
            {footerVisible ?
                <div className="botaoBarraSubir">
                    <button onClick={toggleFooter}><FaCircleArrowUp /></button>
                </div> :
                <div className="botaoBarraSubir" style={displayNone}>
                    <button onClick={toggleFooter}><FaCircleArrowUp /></button>
                </div>
            }
        </body>
    )
}

export default TarefasPage