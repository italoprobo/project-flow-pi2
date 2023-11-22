import { IProjeto } from "../../../src/interfaces";
import ProjetoListaItem from "../ProjetoListaItem";
import "./styleProjetoLista.css"

interface ProjetoListProps {
    projetos: IProjeto[]
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