import "../../components/ProjetoListaItem"
import { useEffect, useState } from "react";
import { useProjeto } from '../../hooks'
import { Link, useParams } from "react-router-dom";
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import "./styleProjeto.css"
import { useEquipe } from "../../hooks/useEquipe";
import { EquipeLista } from "./components/EquipeLista";

const ProjetoPage = () => {
    const { projeto, getProjetoId } = useProjeto()

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
                    <p>{projeto?.nome}</p>
                    <p>Responsável: {projeto?.responsavel.nome}</p>
                    <p>Início: {dataInicioFormatada}</p>
                    <p>Final: {dataFinalFormatada}</p>
                </div>
                <div className="equipes">
                    <EquipeLista equipes={equipes} />
                </div>
            </main>
            {footerVisible ?
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

export default ProjetoPage