import "./styleHome.css"
import "./components/TarefaListaItem"
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useTarefa } from '../../hooks'
import { TarefaLista } from "./components/TarefaLista";
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext'

const HomePage = () => {

    const { user } = useAuth()

    const { getAllTarefas } = useTarefa()

    const { fourTarefas, get4Tarefas } = useTarefa()

    useEffect(() => {
        getAllTarefas()
    }, [])

    useEffect(() => {
        get4Tarefas()
    }, [])

    const displayNone = {
        display: 'none'
    };

    const [footerVisible, setFooterVisible] = useState(true);

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
                        <button><img src="../../../public/account.png" alt="Conta" className="conta_icon" /></button>
                    </div>
                </div>
            </header>
            <main>
                <div className="div_saudacao">
                    <h1>Olá, {user?.nome}.</h1>
                    <p>Essas são as tarefas que você deve executar agora:</p>
                </div>
                <div className="div_lista_tarefas">
                    <TarefaLista tarefas={fourTarefas} />
                </div>
                <div className="div_lista_reunioes">

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

export default HomePage