import { ITarefa } from "../../../../interfaces";
import TarefaListaItem from "../TarefaListaItem";

interface TarefaListProps {
    tarefas: ITarefa[]
}

export function TarefaLista({tarefas}: TarefaListProps) {
    return(
        <>
            <ul>
                {tarefas.map(tarefa => <TarefaListaItem key={tarefa.id} tarefa={tarefa}/>)}
            </ul>
        </>
    )
}