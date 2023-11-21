import "../../components/ProjetoListaItem"
import { useEffect } from "react";
import { useProjeto } from '../../hooks'
import { Link, useParams } from "react-router-dom";

const ProjetoPage = () => {
    const { projeto, getProjetoId } = useProjeto()

    let { id } = useParams()

    useEffect(() => {
        getProjetoId(id)
    }, [])

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
                <div className="adicionarTarefa">
                    <Link to="">Adicionar tarefa</Link>
                </div>
                <div className="criarEquipe">
                    <Link to="">Criar equipe</Link>
                </div>
                <div className="ProjetoDetalhes">
                    <p>{projeto?.nome}</p>
                    <p>{projeto?.responsavel.nome}</p>
                </div>
            </main>
            <footer>
                <div className="footer-content">
                    <div className="menu">
                        <Link to="/projetos"><a href=""><img src="../../../public/list_icon.png" alt="Lista" className="lista" /></a></Link>
                        <a href=""><img src="../../../public/calendar_icon.png" alt="Calendario" className="calendario" /></a>
                        <a href=""><img src="../../../public/team_icon.png" alt="Time" className="time" /></a>
                    </div>
                </div>
            </footer>
        </body>
    )
}

export default ProjetoPage