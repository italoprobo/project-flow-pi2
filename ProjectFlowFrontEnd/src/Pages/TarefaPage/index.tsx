import "./styleTarefaPage.css"
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext'
import { useTarefa } from "../../hooks";

const TarefaPage = () => {

    const { user, signout } = useAuth()

    const { tarefa, getTarefaId, mudarStatus } = useTarefa()

    let { id } = useParams()

    useEffect(() => {
        getTarefaId(id)
    }, [])

    const displayNone = {
        display: 'none'
    };

    const [footerVisible, setFooterVisible] = useState(true);

    const toggleFooter = () => {
        setFooterVisible(!footerVisible);
    };

    const dataInicio = String(tarefa?.dt_inicio)
    const dataInicioSeparada = dataInicio.split("T")[0]
    const dataInicioSeparada2 = dataInicioSeparada.split("-")

    const dataInicioFormatada = `${dataInicioSeparada2[2]}/${dataInicioSeparada2[1]}/${dataInicioSeparada2[0]}`

    const dataFinal = String(tarefa?.dt_final)
    const dataFinalSeparada = dataFinal.split("T")[0]
    const dataFinalSeparada2 = dataFinalSeparada.split("-")

    const dataFinalFormatada = `${dataFinalSeparada2[2]}/${dataFinalSeparada2[1]}/${dataFinalSeparada2[0]}`

    const handleMudarStatus = () => {
        if(tarefa)
        mudarStatus(tarefa?.id)
    }

    return (
        <body>
            <header>
                {user?.cargo === "administrador" ?
                    <div className="head-content">
                        <div className="div_logo">
                            <Link to="/"><img src="../../../public/icon.png" alt="Logo" className="logo" /></Link>
                        </div>
                        <div className="direita">
                            <div className="botaoSair">
                                <button className="btn-sair" onClick={signout}>Sair</button>
                            </div>
                            <div className="botaoSair">
                                <Link to={"/cadastro"}><button className="btn-sair" onClick={signout}>cadastrar usuário</button></Link>
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
                <p><b>Nome</b> {tarefa?.nome}</p>
                <p>Descrição: {tarefa?.descricao}</p>
                <p>Tempo previsto: {tarefa?.tempo_previsto} minutos</p>
                <p>Importância: {tarefa?.importancia}</p>
                <p>Início: {dataInicioFormatada}</p>
                <p>Final: {dataFinalFormatada}</p>
                {tarefa?.isDone === true ?
                    <><p className="concluido">Concluído</p>
                    <button onClick={handleMudarStatus}>Marcar como não concluída</button></> :
                    <><p className="nao_concluido">Não concluído</p>
                    <button onClick={handleMudarStatus}>Marcar como concluída</button></>
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

export default TarefaPage