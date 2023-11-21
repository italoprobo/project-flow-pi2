import "./styleTarefa.css";
import { useEffect, useState } from "react";
import { useTarefa } from "../../hooks";
import { TarefaLista } from "../../components/TarefaLista"

const TarefaPage = () => {
    const { tarefas, getAllTarefas } = useTarefa()

    useEffect(() => {
        getAllTarefas()
    }, [])

    return(
        <body>
            <header>
                    <img src="../../../public/icon.png" alt="Logo" className="logo"/>
            </header>
            <main>
                <div className="div_frase">
                    <p>Essas são todas as suas tarefas:</p>
                </div> 
                <div className="div_lista_tarefas">
                    <TarefaLista tarefas={tarefas}/>
                </div>
            </main>
            <footer>
                <div className="footer-content">
                    <div className="menu">
                        <a href=""><img src="../../../public/list_icon.png" alt="Lista" className="lista"/></a>
                        <a href=""><img src="../../../public/calendar_icon.png" alt="Calendario" className="calendario"/></a>
                        <a href=""><img src="../../../public/team_icon.png" alt="Time" className="time"/></a>
                    </div>
                </div>
            </footer>
        </body>
    )
}

export default TarefaPage