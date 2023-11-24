import "../../components/ProjetoListaItem"
import { useEffect, useState } from "react";
import { useProjeto } from '../../hooks'
import { ProjetoLista } from "../../components/ProjetoLista";
import { Link } from "react-router-dom";
import "./styleProjetosPage.css"
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";

const ProjetosPage = () => {
    const { projetos, getAllProjetos } = useProjeto()

    useEffect(() => {
        getAllProjetos()
    }, [])

    const displayNone = {
        display: 'none'
    };

    const [footerVisible, setFooterVisible] = useState(false);

    const toggleFooter = () => {
        setFooterVisible(!footerVisible);
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
                    <div className="linkCriarProjeto">
                        <Link to="">Criar Projeto</Link>
                    </div>
                    <ProjetoLista projetos={projetos} />
                </div>
            </main>
            {footerVisible ?
                <footer style={displayNone}>
                    <div className="footer-content">
                        <div className="menu">
                            <Link to="/projetos"><a href=""><img src="../../../public/list_icon.png" alt="Lista" className="lista" /></a></Link>
                            <a href=""><img src="../../../public/calendar_icon.png" alt="Calendario" className="calendario" /></a>
                            <a href=""><img src="../../../public/team_icon.png" alt="Time" className="time" /></a>
                        </div>
                    </div>
                </footer> :
                <footer>
                    <div className="footer-content">
                        <div className="botaoBarraAbaixar">
                            <button onClick={toggleFooter}><FaCircleArrowDown /></button>
                        </div>
                        <div className="menu">
                            <Link to="/projetos"><a href=""><img src="../../../public/list_icon.png" alt="Lista" className="lista" /></a></Link>
                            <a href=""><img src="../../../public/calendar_icon.png" alt="Calendario" className="calendario" /></a>
                            <a href=""><img src="../../../public/team_icon.png" alt="Time" className="time" /></a>
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

export default ProjetosPage