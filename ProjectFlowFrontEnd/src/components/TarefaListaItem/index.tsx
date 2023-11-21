import { Tarefa } from "../../../../project-flow-api/src/tarefa/entities/tarefa.entity";
import "./styleTarefaListaItem.css"

interface TarefaListItemProps {
    tarefa: Tarefa
}

export default function TarefaListaItem({tarefa}: TarefaListItemProps) {

    return (

        <>
            <div className="card">
                <p>Nome: {tarefa.nome}</p>
                <p>Projeto: {tarefa.projeto.nome}</p>
                <p>{tarefa.equipe.nome}</p>
                {tarefa.isDone?
                <p className="concluido" >Concluído</p> :
                <p className="nao_concluido">Não Concluído</p>
                }
            </div>
        </>

    )

};
