import { Link } from "react-router-dom";
import {Tarefa} from "../../../../../../project-flow-api/src/tarefa/entities/tarefa.entity";
import "./styleTarefaListaItem.css"
import { CgDetailsMore } from "react-icons/cg";

interface TarefaListItemProps {
    tarefa: Tarefa
}

export default function TarefaListaItem({tarefa}: TarefaListItemProps) {

    return (

        <>
            <div className="cardTarefa">
                <p>Nome: {tarefa.nome}</p>
                <p>Equipe: {tarefa.equipe.nome}</p>
                <Link to={`/tarefa/${tarefa.id}`}><button className="ver-mais-tarefa "><CgDetailsMore /></button></Link>
            </div>
        </>

    )

};
