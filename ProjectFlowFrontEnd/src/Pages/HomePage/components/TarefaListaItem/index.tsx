import {Tarefa} from "../../../../../../project-flow-api/src/tarefa/entities/tarefa.entity";
import "./style.css"

interface TarefaListItemProps {
    tarefa: Tarefa
}

export default function TarefaListaItem({tarefa}: TarefaListItemProps) {

    return (

        <>
            <div className="card">
                <p>Nome: {tarefa.nome}</p>
                <p>Projeto: {tarefa.projeto.nome}</p>
                <p>Equipe: {tarefa.equipe.nome}</p>
                {tarefa.isDone?
                <p>Feito</p> :
                <p>Não feito</p>
                }
            </div>
        </>

    )

};
