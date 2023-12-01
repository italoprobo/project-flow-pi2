import "../../components/ProjetoListaItem"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styleParticipantes.css"
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import { useEquipe } from "../../hooks/useEquipe";
import { ParticipantesLista } from "./components/ParticipantesLista";

const ParticipantesPage = () => {
    const { participantes } = useEquipe()

    const [footerVisible, setFooterVisible] = useState(true);
    const [edicaoAtivaNome, setEdicaoAtivaNome] = useState(false);
    const [edicaoAtivaResponsavel, setEdicaoAtivaResponsavel] = useState(false);

    let { id } = useParams()

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
            <div className="participantes">
                    <ParticipantesLista usuarios={participantes} />
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

export default ParticipantesPage