import { Projeto } from "../../../../project-flow-api/src/projeto/entities/projeto.entity";
import { IProjeto } from "../../../src/interfaces";
import ProjetoListaItem from "../ProjetoListaItem";
import "./styleProjetoLista.css"

interface ProjetoListProps {
    projetos: Projeto[]
}

export function ProjetoLista({ projetos }: ProjetoListProps) {
    return (
        <>
            <div className="ListaProjetos">
                <ul>
                    {projetos.map(projeto => <ProjetoListaItem key={projeto.id} projeto={projeto}/>)}
                </ul>
            </div>
        </>
    )
}