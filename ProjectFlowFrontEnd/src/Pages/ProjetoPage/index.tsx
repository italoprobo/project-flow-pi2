import "../../components/ProjetoListaItem"
import { useEffect, useState } from "react";
import { useProjeto } from '../../hooks'
import { Link, useParams } from "react-router-dom";
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import "./styleProjeto.css"
import { useEquipe } from "../../hooks/useEquipe";
import { EquipeLista } from "./components/EquipeLista";

const ProjetoPage = () => {
    const { projeto, getProjetoId, salvarEdicaoNome, salvarEdicaoDataIncio, salvarEdicaoDataFinal } = useProjeto()
    const [nomeProjetoEditado, setNomeProjetoEditado] = useState("");
    const [dataInicioEditada, setDataInicioEditada] = useState('');
    const [dataFinalEditada, setDataFinalEditada] = useState('');

    let { id } = useParams()

    useEffect(() => {
        getProjetoId(id)
    }, [])

    const { equipes, getAllEquipes } = useEquipe()

    useEffect(() => {
        getAllEquipes()
    }, [])

    const [footerVisible, setFooterVisible] = useState(true);

    const toggleFooter = () => {
        setFooterVisible(!footerVisible);
    };

    const [edicaoAtivaNome, setEdicaoAtivaNome] = useState(false);

    const toggleEdicaoNome = () => {
        setEdicaoAtivaNome(!edicaoAtivaNome);
    };

    const [edicaoAtivaResponsavel, setEdicaoAtivaResponsavel] = useState(false);

    const toggleEdicaoResponsavel = () => {
        setEdicaoAtivaResponsavel(!edicaoAtivaResponsavel);
    };

    const [edicaoAtivaInicio, setEdicaoAtivaInicio] = useState(false);

    const toggleEdicaoInicio = () => {
        setEdicaoAtivaInicio(!edicaoAtivaInicio);
    };

    const [edicaoAtivaFinal, setEdicaoAtivaFinal] = useState(false);

    const toggleEdicaoFinal = () => {
        setEdicaoAtivaFinal(!edicaoAtivaFinal);
    };

    const displayNone = {
        display: 'none'
    };

    const dataInicio = String(projeto?.dt_inicio)
    const dataInicioSeparada = dataInicio.split("T")[0]
    const dataInicioSeparada2 = dataInicioSeparada.split("-")

    const dataInicioFormatada = `${dataInicioSeparada2[2]}/${dataInicioSeparada2[1]}/${dataInicioSeparada2[0]}`

    const dataFinal = String(projeto?.dt_final)
    const dataFinalSeparada = dataFinal.split("T")[0]
    const dataFinalSeparada2 = dataFinalSeparada.split("-")

    const dataFinalFormatada = `${dataFinalSeparada2[2]}/${dataFinalSeparada2[1]}/${dataFinalSeparada2[0]}`

    const handleSalvarEdicaoNome = () => {
        salvarEdicaoNome(nomeProjetoEditado);
        toggleEdicaoNome()
    };

    const handleSalvarEdicaoDataInicio = () => {
        salvarEdicaoDataIncio(nomeProjetoEditado);
        toggleEdicaoInicio()
    };
    const handleSalvarEdicaoDataFinal = () => {
        salvarEdicaoDataFinal(nomeProjetoEditado);
        toggleEdicaoFinal()
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
                        <button>Criar equipe</button>
                    </div>
                </div>
                <div className="ProjetoDetalhes">
                    <div className="dadosProjeto">
                        <div className="areaDadoProjeto">
                            {edicaoAtivaNome ? (
                                <input
                                    type="text"
                                    value={nomeProjetoEditado}
                                    onChange={(e) => setNomeProjetoEditado(e.target.value)}
                                />
                            ) : (
                                <p>{nomeProjetoEditado || projeto?.nome}</p>
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
                            {edicaoAtivaResponsavel ? (
                                <input
                                    type="text"
                                />
                            ) : (
                                <p>Responsável: {projeto?.responsavel.nome}</p>
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
                            {edicaoAtivaInicio ? (
                                <input
                                    type="text"
                                    value={dataInicioEditada}
                                    onChange={(e) => setDataInicioEditada(e.target.value)}
                                />
                            ) : (
                                <p>Início: {dataInicioEditada || dataInicioFormatada}</p>
                            )}
                        </div>
                        <div className="areaBotaoEditarProjeto">
                            {edicaoAtivaInicio ? 
                            <><button className="editarProjeto" onClick={handleSalvarEdicaoDataInicio}>Salvar</button>
                            <button className="editarProjeto" onClick={toggleEdicaoInicio}>Cancelar</button></>
                             : <button className="editarProjeto" onClick={toggleEdicaoInicio}>Editar</button>}
                        </div>
                    </div>
                    <div className="dadosProjeto">
                        <div className="areaDadoProjeto">
                            {edicaoAtivaFinal ? (
                                <input
                                type="text"
                                value={dataFinalEditada}
                                onChange={(e) => setDataFinalEditada(e.target.value)}
                                />
                            ) : (
                                <p>Final: {dataFinalEditada || dataFinalFormatada}</p>
                            )}
                        </div>
                        <div className="areaBotaoEditarProjeto">
                            {edicaoAtivaFinal ? 
                            <><button className="editarProjeto" onClick={handleSalvarEdicaoDataFinal}>Salvar</button>
                            <button className="editarProjeto" onClick={toggleEdicaoFinal}>Cancelar</button></>
                             : <button className="editarProjeto" onClick={toggleEdicaoFinal}>Editar</button>}
                        </div>
                    </div>
                </div>
                <div className="equipes">
                    <EquipeLista equipes={equipes} />
                </div>
            </main>
            {
                footerVisible ?
                    <footer style={displayNone}>
                        <div className="footer-content">
                            <div className="menu">
                                <Link to="/projetos"><img src="../../../public/list_icon.png" alt="Lista" className="lista" /></Link>
                                <Link to="/tarefas"><img src="../../../public/calendar_icon.png" alt="Calendario" className="calendario" /></Link>
                                <Link to=""><img src="../../../public/team_icon.png" alt="Time" className="time" /></Link>
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
                                <Link to=""><img src="../../../public/team_icon.png" alt="Time" className="time" /></Link>
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

export default ProjetoPage