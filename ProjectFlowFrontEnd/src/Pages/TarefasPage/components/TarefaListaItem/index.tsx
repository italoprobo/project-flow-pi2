import {Tarefa} from "../../../../../../project-flow-api/src/tarefa/entities/tarefa.entity";
import { ITarefa } from "../../../../interfaces";
import "./styleTarefaListaItemPage.css"

interface TarefaListItemProps {
    tarefa: ITarefa
}

export default function TarefaListaItem({tarefa}: TarefaListItemProps) {

    return (

        <>
            <div className="cardTarefa">
                <p>Nome: {tarefa.nome}</p>
                <p>Projeto: {tarefa.projeto.nome}</p>
                <p>Equipe: {tarefa.equipe.nome}</p>
                <p>Importância: {tarefa.importancia}</p>
                <p className="tempoPrevisto" >Tempo previsto: {tarefa.tempo_previsto} minutos</p>
                {tarefa.isDone?
                <p className="concluido" >Concluído</p> :
                <p className="nao_concluido">Não Concluído</p>
                }
            </div>
        </>

    )

};
