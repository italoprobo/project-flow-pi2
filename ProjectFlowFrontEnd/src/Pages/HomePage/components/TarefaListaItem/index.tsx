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
                <p>Descrição: {tarefa.descricao}</p>
                <p>Importância: {tarefa.importancia}</p>
                <p>Projeto: </p>
                {tarefa.isDone?
                <p>Feito</p> :
                <p>Não feito</p>
                }
            </div>
        </>

    )

};
