import "../../components/ProjetoListaItem"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import "./styleEquipe.css"
import { useEquipe } from "../../hooks/useEquipe";

const EquipePage = () => {
    const { equipe, getEquipeId } = useEquipe()

    const [footerVisible, setFooterVisible] = useState(true);
    const [edicaoAtivaNome, setEdicaoAtivaNome] = useState(false);
    const [edicaoAtivaResponsavel, setEdicaoAtivaResponsavel] = useState(false);

    let { id } = useParams()

    useEffect(() => {
        getEquipeId(id)
    }, [])

    const toggleFooter = () => {
        setFooterVisible(!footerVisible);
    };

    const toggleEdicaoNome = () => {
        setEdicaoAtivaNome(!edicaoAtivaNome);
    };

    const toggleEdicaoResponsavel = () => {
        setEdicaoAtivaResponsavel(!edicaoAtivaResponsavel);
    };

    const displayNone = {
        display: 'none'
    };

    return (
        <body>
            <header>
                <div className="head-content">
                    <div className="div_logo">
                        <Link to="/"><img src="../../../public/icon.png" alt="Logo" className="logo" /></Link>
                    </div>
                    <div className="div_account">
                        <img src="../../../public/account.png" alt="Conta" className="conta_icon" />
                    </div>
                </div>
            </header>
            <main>
                <div className="criarEquipe">
                    <div className="BotaoCriarEquipe">
                        <button>Adicionar tarefa</button>
                    </div>
                </div>
                <div className="ProjetoDetalhes">
                    <div className="dadosProjeto">
                        <div className="areaDadoProjeto">
                            {edicaoAtivaNome ? (
                                <input
                                    type="text"
                                />
                            ) : (
                                <p>{equipe?.nome}</p>
                            )}
                        </div>
                        <div className="areaBotaoEditarProjeto">
                            {edicaoAtivaNome ? 
                            <><button className="editarProjeto" onClick={toggleEdicaoNome}>Salvar</button>
                            <button className="editarProjeto" onClick={toggleEdicaoNome}>Cancelar</button></>
                             : <button className="editarProjeto" onClick={toggleEdicaoNome}>Editar</button>}
                        </div>
                    </div>
                    <div className="dadosProjeto">
                        <div className="areaDadoProjeto">
                            {edicaoAtivaResponsavel ? (
                                <input
                                    type="text"
                                />
                            ) : (
                                <p>Responsável: {equipe?.responsavel.nome}</p>
                            )}
                        </div>
                        <div className="areaBotaoEditarProjeto">
                            {edicaoAtivaResponsavel ? 
                            <><button className="editarProjeto" onClick={toggleEdicaoResponsavel}>Salvar</button>
                            <button className="editarProjeto" onClick={toggleEdicaoResponsavel}>Cancelar</button></>
                             : <button className="editarProjeto" onClick={toggleEdicaoResponsavel}>Editar</button>}
                        </div>
                    </div>
                    <div className="dadosProjeto">
                        <div className="areaDadoProjeto">
                            <Link to={`/participantes/${equipe?.id}`}>Ver Participantes</Link>
                        </div>
                    </div>
                </div>
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
        </body >
    )
}

export default EquipePage