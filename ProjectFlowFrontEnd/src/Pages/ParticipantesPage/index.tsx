import "../../components/ProjetoListaItem"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styleParticipantes.css"
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import { ParticipantesLista } from "./components/ParticipantesLista";
import { useUsuario_Equipe } from "../../hooks/useUsuario_Equipe";
import { IUsuario } from "../../interfaces";
import { useUsuario } from "../../hooks";
import { useAuth } from "../../contexts/AuthContext";

const ParticipantesPage = () => {

    const {user, signout} = useAuth()

    const [footerVisible, setFooterVisible] = useState(true);

    const { usuario_equipe, findAllUser_Team  } = useUsuario_Equipe()
    const { usuarios, getAllUsuarios  } = useUsuario()

    useEffect(() => {
        findAllUser_Team(),
        getAllUsuarios()
    }, [])

    let { id } = useParams()

    const toggleFooter = () => {
        setFooterVisible(!footerVisible);
    };

    const displayNone = {
        display: 'none'
    };

    let membros: IUsuario[] = []

    for (let equipe of usuario_equipe) {
        for (let usuario of usuarios) {
            if(usuario.id === equipe.usuarioId && equipe.equipeId === Number(id)) {
                membros.push(usuario)
            }
        }
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
                <h1>Membros:</h1>
            <div className="participantes">
                    <ParticipantesLista usuarios={membros} />
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

export default ParticipantesPage