import { Link } from "react-router-dom";
import { ITarefa } from "../../../../interfaces";
import "./styleTarefaListaItemPage.css"
import { CgDetailsMore } from "react-icons/cg";

interface TarefaListItemProps {
    tarefa: ITarefa
}

export default function TarefaListaItem({tarefa}: TarefaListItemProps) {

    return (

        <>
            <div className="cardTarefa">
                <p className="inf1">{tarefa.nome}</p>
                <p className="inf2">{tarefa.equipe.nome}</p>
                <p className="inf3">{tarefa.projeto.nome}</p>
            <Link to={`/tarefa/${tarefa.id}`}><button className="ver-mais-tarefa "><CgDetailsMore /></button></Link>
            </div>
        </>

    )

};
