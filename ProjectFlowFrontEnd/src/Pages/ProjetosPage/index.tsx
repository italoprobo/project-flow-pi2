import "../../components/ProjetoListaItem"
import { useEffect, useState } from "react";
import { useProjeto } from '../../hooks'
import { ProjetoLista } from "../../components/ProjetoLista";
import { Link } from "react-router-dom";
import "./styleProjetosPage.css"
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import PopupComponent from "./componentes/Popup";
import { useAuth } from "../../contexts/AuthContext";

const ProjetosPage = () => {
    const { signout, isAuthenticated, user } = useAuth()

    const { projetos, getAllProjetos } = useProjeto()
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        getAllProjetos()
    }, [])

    const displayNone = {
        display: 'none'
    };

    const [footerVisible, setFooterVisible] = useState(true);

    const toggleFooter = () => {
        setFooterVisible(!footerVisible);
    };

    const togglePopup = () => {
        setPopupVisible(!popupVisible);
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
                <div className="div_lista_projetos">
                    <h1>Seus projetos: </h1>
                    {user?.cargo === "administrador" ?
                        <div className="linkCriarProjeto">
                            <button onClick={togglePopup}>Criar Projeto</button>
                        </div> :
                        <p></p>
                    }
                    <ProjetoLista projetos={projetos} />
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
            {popupVisible && <PopupComponent onClose={togglePopup} />}
        </body>
    )
}

export default ProjetosPage