import "../../components/ProjetoListaItem"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import "./styleEquipe.css"
import { useEquipe } from "../../hooks/useEquipe";
import { useAuth } from "../../contexts/AuthContext";
import { Tarefa } from "../../../../project-flow-api/src/tarefa/entities/tarefa.entity";
import { TarefaLista } from "../TarefasPage/components/TarefaLista";
import { useTarefa } from "../../hooks";
import { ITarefa } from "../../interfaces";
import PopupTarefaComponent from "./components/PopupTarefa";

const EquipePage = () => {
    const { signout, user } = useAuth()
    const { equipe, getEquipeId, salvarEdicaoNomeEquipe, salvarEdicaoFuncaoEquipe } = useEquipe()
    const { tarefas, getAllTarefas } = useTarefa()

    const [footerVisible, setFooterVisible] = useState(true);
    const [edicaoAtivaNome, setEdicaoAtivaNome] = useState(false);
    const [edicaoAtivaFuncao, setEdicaoAtivaFuncao] = useState(false);
    const [edicaoAtivaResponsavel, setEdicaoAtivaResponsavel] = useState(false);

    let { id } = useParams()

    useEffect(() => {
        getEquipeId(id)
        getAllTarefas()
    }, [])

    const toggleFooter = () => {
        setFooterVisible(!footerVisible);
    };

    const toggleEdicaoNome = () => {
        setEdicaoAtivaNome(!edicaoAtivaNome);
    };

    const toggleEdicaoFuncao = () => {
        setEdicaoAtivaFuncao(!edicaoAtivaFuncao);
    };

    const toggleEdicaoResponsavel = () => {
        setEdicaoAtivaResponsavel(!edicaoAtivaResponsavel);
    };

    const displayNone = {
        display: 'none'
    };

    let tarefas_equipe: ITarefa[] = []

    for (let tarefa of tarefas) {
        if (tarefa.equipe.id === equipe?.id) {
            tarefas_equipe.push(tarefa)
        }
    }

    let tarefas_equipes_usuarioOrdenadas: Tarefa[] = []

    for (let tarefa of tarefas_equipe) {
        if (!tarefa.isDone && tarefa.importancia === 'Alta') {
            tarefas_equipes_usuarioOrdenadas.push(tarefa)
        }
    }

    for (let tarefa of tarefas_equipe) {
        if (!tarefa.isDone && tarefa.importancia === 'Média') {
            tarefas_equipes_usuarioOrdenadas.push(tarefa)
        }
    }

    for (let tarefa of tarefas_equipe) {
        if (!tarefa.isDone && tarefa.importancia === 'Baixa') {
            tarefas_equipes_usuarioOrdenadas.push(tarefa)
        }
    }

    for (let tarefa of tarefas_equipe) {
        if (tarefa.isDone && tarefa.importancia === 'Alta') {
            tarefas_equipes_usuarioOrdenadas.push(tarefa)
        }
    }

    for (let tarefa of tarefas_equipe) {
        if (tarefa.isDone && tarefa.importancia === 'Média') {
            tarefas_equipes_usuarioOrdenadas.push(tarefa)
        }
    }

    for (let tarefa of tarefas_equipe) {
        if (tarefa.isDone && tarefa.importancia === 'Baixa') {
            tarefas_equipes_usuarioOrdenadas.push(tarefa)
        }
    }

    const [popupVisible, setPopupVisible] = useState(false);

    const [equipeIdAberto, setEquipeIdAberto] = useState(0);
    const [projetoIdAberto, setprojetoIdAberto] = useState(0);

    const togglePopup = (equipeId: number, projetoId: number) => {
        setPopupVisible(!popupVisible);
        setEquipeIdAberto(equipeId);
        setprojetoIdAberto(projetoId);
    };

    const [nomeEquipeEditado, setNomeEquipeEditado] = useState("");

    const handleSalvarEdicaoNome = () => {
        if (equipe) {
            salvarEdicaoNomeEquipe(nomeEquipeEditado, equipe.id);
            toggleEdicaoNome()
        }
    };

    const [funcaoEquipeEditado, setfuncaoEquipeEditado] = useState("");

    const handleSalvarEdicaoFuncao = () => {
        if (equipe) {
            salvarEdicaoFuncaoEquipe(funcaoEquipeEditado, equipe.id);
            toggleEdicaoFuncao()
        }
    };

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
                {user?.id === equipe?.responsavel.id ?
                    <><div className="criarEquipe">
                        <div className="BotaoCriarEquipe">
                            <button onClick={() => togglePopup(equipeIdAberto, projetoIdAberto)}>Adicionar tarefa</button>
                        </div>
                    </div><div className="ProjetoDetalhes">
                            <div className="dadosProjeto">
                                <div className="areaDadoProjeto">
                                    {edicaoAtivaNome ? (
                                        <input
                                            type="text"
                                            value={nomeEquipeEditado}
                                            onChange={(e) => setNomeEquipeEditado(e.target.value)} />
                                    ) : (
                                        <p><b>Equipe: {nomeEquipeEditado || equipe?.nome}</b></p>
                                    )}
                                </div>
                                <div className="areaBotaoEditarProjeto">
                                    {edicaoAtivaNome ?
                                        <><button className="editarProjeto" onClick={handleSalvarEdicaoNome}>Salvar</button>
                                            <button className="editarProjeto" onClick={toggleEdicaoNome}>Cancelar</button></>
                                        : <button className="editarProjeto" onClick={toggleEdicaoNome}>Editar</button>}
                                </div>
                            </div>
                            <div className="dadosProjeto">
                                <div className="areaDadoProjeto">
                                    {edicaoAtivaFuncao ? (
                                        <input
                                            type="text"
                                            value={funcaoEquipeEditado}
                                            onChange={(e) => setfuncaoEquipeEditado(e.target.value)} />
                                    ) : (
                                        <p><b>Função: {funcaoEquipeEditado || equipe?.funcao}</b></p>
                                    )}
                                </div>
                                <div className="areaBotaoEditarProjeto">
                                    {edicaoAtivaFuncao ?
                                        <><button className="editarProjeto" onClick={handleSalvarEdicaoFuncao}>Salvar</button>
                                            <button className="editarProjeto" onClick={toggleEdicaoFuncao}>Cancelar</button></>
                                        : <button className="editarProjeto" onClick={toggleEdicaoFuncao}>Editar</button>}
                                </div>
                            </div>
                            <div className="dadosProjeto">
                                <div className="areaDadoProjeto">
                                    <p><b>Responsável: {equipe?.responsavel.nome}</b></p>
                                </div>
                            </div>
                                <div className="ver-mais-membros">
                                    <Link to={`/participantes/${equipe?.id}`}>Ver Membros</Link>
                                </div>
                        </div></> :
                    <><div className="ProjetoDetalhes">
                        <div className="dadosProjeto">
                            <div className="areaDadoProjeto">
                                {edicaoAtivaNome ? (
                                    <input
                                        type="text" />
                                ) : (
                                    <p>{equipe?.nome}</p>
                                )}
                            </div>
                        </div>
                        <div className="dadosProjeto">
                            <div className="areaDadoProjeto">
                                {edicaoAtivaResponsavel ? (
                                    <input
                                        type="text" />
                                ) : (
                                    <p>Responsável: {equipe?.responsavel.nome}</p>
                                )}
                            </div>
                        </div>
                        <div className="dadosProjeto">
                            <div className="areaDadoProjeto">
                                <Link to={`/participantes/${equipe?.id}`}>Ver Membros</Link>
                            </div>
                        </div>
                    </div><p></p></>
                }
                <div className="listaTarefas">
                    <p className="tarefas-p">Tarefas da equipe:</p>
                    {tarefas_equipes_usuarioOrdenadas.length > 0 ?
                        <TarefaLista tarefas={tarefas_equipes_usuarioOrdenadas} /> :
                        <p>Equipe não possui tarefas</p>
                    }
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
            {popupVisible && equipe && (
                <PopupTarefaComponent onClose={() => togglePopup(equipeIdAberto, projetoIdAberto)} equipeId={equipeIdAberto || equipe.id} projetoId={projetoIdAberto | equipe.projeto.id} />
            )}
        </body >
    )
}

export default EquipePage