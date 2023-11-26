import { ITarefa } from "../../../../interfaces";
import TarefaListaItem from "../TarefaListaItem";
import "./styleTarefaListaPage.css"

interface TarefaListProps {
    tarefas: ITarefa[]
}

export function TarefaLista({ tarefas }: TarefaListProps) {
    return (
        <>
            <div className="ListaTarefas">
                <ul>
                    {tarefas.map(tarefa => <TarefaListaItem key={tarefa.id} tarefa={tarefa} />)}
                </ul>
            </div>
        </>
    )
}