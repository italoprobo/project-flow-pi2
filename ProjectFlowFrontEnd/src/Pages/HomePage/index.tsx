import "./styleHome.css"
import "./components/TarefaListaItem"
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useTarefa } from '../../hooks'
import { TarefaLista } from "./components/TarefaLista";
import { Link } from "react-router-dom";

const HomePage = () => {
    const { tarefas, getAllTarefas } = useTarefa()

    useEffect(() => {
        getAllTarefas()
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
                        <Link to="/home"><img src="../../../public/icon.png" alt="Logo" className="logo" /></Link>
                    </div>
                    <div className="div_account">
                        <img src="../../../public/account.png" alt="Conta" className="conta_icon" />
                    </div>
                </div>
            </header>
            <main>
                <div className="div_saudacao">
                    <h1>Olá, Emanuel.</h1>
                    <p>Essas são as tarefas que você deve executar agora:</p>
                </div>
                <div className="div_lista_tarefas">
                    <TarefaLista tarefas={tarefas} />
                </div>
                <div className="div_lista_reunioes">

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

export default HomePage