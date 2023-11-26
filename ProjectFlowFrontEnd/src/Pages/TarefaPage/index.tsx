import "../HomePage/styleHome.css";
import { useEffect, useState } from "react";
import { useTarefa } from "../../hooks";
import { TarefaLista } from "./components/TarefaLista/"
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

const TarefaPage = () => {
    const { tarefasOrdenadasPrioridade, getTarefasOrdenadasPrioridade } = useTarefa()

    useEffect(() => {
        getTarefasOrdenadasPrioridade()
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
                <div className="div_frase">
                    <p>Essas são todas as suas tarefas:</p>
                </div>
                <div className="div_lista_tarefas">
                    <TarefaLista tarefas={tarefasOrdenadasPrioridade} />
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

export default TarefaPage