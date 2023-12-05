import "../../components/ProjetoListaItem"
import { useEffect, useState } from "react";
import { useProjeto } from '../../hooks'
import { ProjetoLista } from "../../components/ProjetoLista";
import { Link } from "react-router-dom";
import "./styleProjetosPage.css"
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import PopupComponent from "./componentes/Popup";
import { useAuth } from "../../contexts/AuthContext";
import { useEquipe } from "../../hooks/useEquipe";
import { useUsuario_Equipe } from "../../hooks/useUsuario_Equipe";
import { IPVersion } from "net";
import { IProjeto } from "../../interfaces";
import { Projeto } from "../../../../project-flow-api/src/projeto/entities/projeto.entity";

const ProjetosPage = () => {
    const { signout, isAuthenticated, user } = useAuth()

    const [popupVisible, setPopupVisible] = useState(false);

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

    const {projetos, getAllProjetos} = useProjeto()

    const { equipes, getAllEquipes } = useEquipe()
    const {usuario_equipe, findAllUser_Team} = useUsuario_Equipe()

    useEffect(() => {
        getAllProjetos(),
        getAllEquipes(),
        findAllUser_Team()
    }, [])
    

    let ids = []

    for(let linha of usuario_equipe) {
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

    let projetos_usuario: IProjeto[] = []

    const isInProjects = (projetoBuscado: IProjeto) => {
        for (let projeto of projetos_usuario) {
            if(projeto.id === projetoBuscado.id) {
                return true
            }
        }

        return false
    }

    for (let equipe_usuario of equipes_usuario) {
        for (let projeto of projetos) {
            if(equipe_usuario.projeto.id === projeto.id && !isInProjects(projeto)) {
                projetos_usuario.push(projeto)
            }
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
                <div className="div_lista_projetos">
                    <h1>Seus projetos: </h1>
                    {user?.cargo === "administrador" ?
                        <div className="linkCriarProjeto">
                            <button onClick={togglePopup}>Criar Projeto</button>
                        </div> :
                        <p></p>
                    }
                    <ProjetoLista projetos={projetos_usuario} />
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
            {popupVisible && <PopupComponent onClose={togglePopup} />}
        </body>
    )
}

export default ProjetosPage