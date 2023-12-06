import { Link } from "react-router-dom";
import {Equipe} from "../../../../../../project-flow-api/src/equipe/entities/equipe.entity";
import "./styleEquipeListaItem.css"

interface EquipeListItemProps {
    equipe: Equipe
}

export default function EquipeListaItem({equipe}: EquipeListItemProps) {

    return (

        <>
            <div className="cardEquipe">
                <div className="nome-card-equipe">
                    <p>{equipe.nome}</p>
                </div>
                <div className="resto-card-equipe">
                    <div className="resp">
                        <p className="nome-princ">Responsável</p>
                        <p>{equipe.responsavel.nome}</p>
                    </div>
                    <div className="proj">
                        <p className="nome-princ">Projeto</p>
                        <p>{equipe.projeto.nome}</p>
                    </div>
                </div>
                <div className="linkEquipe">
                    <Link to={`/equipes/${equipe.id}`}>Ver equipe</Link>
                </div>
            </div>
        </>

    )

};
