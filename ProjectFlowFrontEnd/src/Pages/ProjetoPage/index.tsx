import "../../components/ProjetoListaItem"
import { useEffect, useState } from "react";
import { useProjeto } from '../../hooks'
import { Link, useParams } from "react-router-dom";
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import "./styleProjeto.css"
import { useEquipe } from "../../hooks/useEquipe";
import { EquipeLista } from "./components/EquipeLista";
import { useAuth } from "../../contexts/AuthContext";
import PopupEquipe from "../EquipesPage/componentes/PopupEquipe";
import { IEquipe } from "../../interfaces";

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
        focus()
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

    const { user } = useAuth()

    const dataInicio = String(projeto?.dt_inicio)
    const dataInicioSeparada = dataInicio.split("T")[0]
    const dataInicioSeparada2 = dataInicioSeparada.split("-")

    const dataInicioFormatada = `${dataInicioSeparada2[2]}/${dataInicioSeparada2[1]}/${dataInicioSeparada2[0]}`

    const dataFinal = String(projeto?.dt_final)
    const dataFinalSeparada = dataFinal.split("T")[0]
    const dataFinalSeparada2 = dataFinalSeparada.split("-")

    const dataFinalFormatada = `${dataFinalSeparada2[2]}/${dataFinalSeparada2[1]}/${dataFinalSeparada2[0]}`

    const handleSalvarEdicaoNome = () => {
        if (projeto) {
            salvarEdicaoNome(nomeProjetoEditado, projeto.id);
            toggleEdicaoNome()
        }
    };

    const handleSalvarEdicaoDataInicio = () => {
        if (projeto) {
            salvarEdicaoDataIncio(dataInicioEditada, projeto.id);
            toggleEdicaoInicio()
        }
    };
    const handleSalvarEdicaoDataFinal = () => {
        if (projeto) {
            salvarEdicaoDataFinal(dataFinalEditada, projeto.id);
            toggleEdicaoFinal()
        }
    };

    const [projetoIdAberto, setProjetoIdAberto] = useState(0);

    const [popupVisible, setPopupVisible] = useState(false);

    const togglePopup = (projetoId: number) => {
        setPopupVisible(!popupVisible);
        setProjetoIdAberto(projetoId);
    };

    let equipesProjeto: IEquipe[] = []

    for (let equipe of equipes) {
        if (equipe.projeto.id === projeto?.id) {
            equipesProjeto.push(equipe)
        }
    }

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
                {projeto?.responsavel.id === user?.id ?
                    <><div className="criarEquipe">
                        <div className="BotaoCriarEquipe">
                            <button onClick={() => togglePopup(projetoIdAberto)}>Criar equipe</button>
                        </div>
                    </div><div className="ProjetoDetalhes">
                            <div className="dadosProjeto">
                                <div className="areaDadoProjeto">
                                    {edicaoAtivaNome ? (
                                        <input
                                            type="text"
                                            value={nomeProjetoEditado}
                                            onChange={(e) => setNomeProjetoEditado(e.target.value)} />
                                    ) : (
                                        <p><b>Projeto: {nomeProjetoEditado || projeto?.nome}</b></p>
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
                                    <p>Responsável: {projeto?.responsavel.nome}</p>
                                </div>
                            </div>
                            <div className="dadosProjeto">
                                <div className="areaDadoProjeto">
                                    {edicaoAtivaInicio ? (
                                        <input
                                            type="date"
                                            value={dataInicioEditada}
                                            onChange={(e) => setDataInicioEditada(e.target.value)} />
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
                                            type="date"
                                            value={dataFinalEditada}
                                            onChange={(e) => setDataFinalEditada(e.target.value)} />
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
                        </div></> :
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
                                    <p>Nome: {nomeProjetoEditado || projeto?.nome}</p>
                                )}
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
                        </div>
                    </div>
                }
                <div className="equipes">
                    <EquipeLista equipes={equipesProjeto} />
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
            {popupVisible && projeto && (
                <PopupEquipe onClose={() => togglePopup(projetoIdAberto)} projetoId={projetoIdAberto || projeto.id} />
            )}
        </body >
    )
}

export default ProjetoPage