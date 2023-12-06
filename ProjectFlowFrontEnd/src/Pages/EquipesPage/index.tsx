import "../../components/ProjetoListaItem"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styleEquipesPage.css"
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import { useAuth } from "../../contexts/AuthContext";
import { useEquipe } from "../../hooks/useEquipe";
import { EquipeLista } from "../ProjetoPage/components/EquipeLista";
import { useUsuario_Equipe } from "../../hooks/useUsuario_Equipe";
import PopupEquipe from './componentes/PopupEquipe'; 

const EquipesPage = () => {
    const { signout, user } = useAuth()

    const { equipes, getAllEquipes } = useEquipe()
    const {usuario_equipe, findAllUser_Team} = useUsuario_Equipe()

    useEffect(() => {
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

    const displayNone = {
        display: 'none'
    };

    const [footerVisible, setFooterVisible] = useState(true);

    const toggleFooter = () => {
        setFooterVisible(!footerVisible);
    };

    const [popupVisible, setPopupVisible] = useState(false);

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
                <div className="div_lista_equipe">
                    <h1>Equipes </h1>
                    {equipes_usuario.length > 0 ?
                    <EquipeLista equipes={equipes_usuario} />:
                    <div className="participar">
                        <p>Você ainda não participa de nenhuma equipe!</p>
                    </div>
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
            {popupVisible && <PopupEquipe onClose={togglePopup} />}
        </body>
    )
}

export default EquipesPage