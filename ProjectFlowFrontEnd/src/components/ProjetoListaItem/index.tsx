import { Link } from "react-router-dom";
import { Projeto } from "../../../../project-flow-api/src/projeto/entities/projeto.entity";
import "./styleProjetoListaItem.css"

interface ProjetoListItemProps {
    projeto: Projeto
}

export default function ProjetoListaItem({ projeto }: ProjetoListItemProps) {

    return (

        <>
            <div className="cardProjeto">
                <p>Nome {projeto.nome}</p>
                <p>Responsável {projeto.responsavel.nome}</p>
                <div className="linkProjeto">
                    <Link to={`/projetos/${projeto.id}`}>Ver projeto</Link>
                </div>
            </div>
        </>

    )

};
