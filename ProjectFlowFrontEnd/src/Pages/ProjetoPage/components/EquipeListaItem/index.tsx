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
                <p>Nome: {equipe.nome}</p>
                <p>Responsável: {equipe.responsavel.nome}</p>
                <p>Projeto: {equipe.projeto.nome}</p>
                <p>Função: {equipe.funcao}</p>
                <div className="linkEquipe">
                    <Link to={`/equipes/${equipe.id}`}>Ver equipe</Link>
                </div>
            </div>
        </>

    )

};
