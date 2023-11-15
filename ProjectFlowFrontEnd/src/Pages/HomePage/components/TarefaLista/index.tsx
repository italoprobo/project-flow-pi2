import { ITarefa } from "../../../../interfaces";
import TarefaListaItem from "../TarefaListaItem";

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
                <a href="">Ver todas</a>
            </div>
        </>
    )
}