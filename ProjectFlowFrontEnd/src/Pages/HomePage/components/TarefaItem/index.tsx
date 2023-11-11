import { useEffect, useState } from "react";
import api from "../../../../../api";

export default function TarefaListaItem(){
    const [tarefas, setTarefas] = useState<any[]>([]);
    const getTarefas = async () => {
        await api.get("/api/v1/tarefa").then((response) => setTarefas(response.data));
    };
    
    useEffect(() => {
        getTarefas();
    }, []);

    return (
    
    <div>
        <ul>
            {tarefas && tarefas.map((tarefa) => (
                <li key={tarefa.id}>
                    {tarefa.nome}
                </li>
            ))}
        </ul>
    </div>
    
        )
    
};
