import { useEffect, useState } from "react";
import {Tarefa} from "../../../../../../project-flow-api/src/tarefa/entities/tarefa.entity";

interface TarefaListItemProps {
    tarefa: Tarefa
}

export default function TarefaListaItem({tarefa}: TarefaListItemProps) {
    return (

        <>
            <p>Nome: {tarefa.nome}</p>
            <p>Descrição: {tarefa.descricao}</p>
        </>

    )

};
