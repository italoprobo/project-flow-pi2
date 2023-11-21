import { ITarefa } from "../../../../interfaces";
import TarefaListaItem from "../TarefaListaItem";
import "./style.css"

interface TarefaListProps {
    tarefas: ITarefa[]
}

export function TarefaForm({ tarefas }: TarefaListProps) {
    return (
        <>
            <div className="ListaTarefas">
                <form>
                    <input type="text" placeholder="Descrição da Task" />
                    <input type="submit" value="Adicionar Tarefa" />
                </form>
            </div>
        </>
    )
}