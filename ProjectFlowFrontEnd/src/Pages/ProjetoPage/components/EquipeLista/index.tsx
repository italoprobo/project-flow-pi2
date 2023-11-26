import { IEquipe } from "../../../../interfaces";
import EquipeListaItem from "../EquipeListaItem";
import "./styleEquipeLista.css"

interface EquipeListProps {
    equipes: IEquipe[]
}

export function EquipeLista({ equipes }: EquipeListProps) {
    return (
        <>
            <div className="ListaEquipes">
                <ul>
                    {equipes.map(equipe => <EquipeListaItem key={equipe.id} equipe={equipe} />)}
                </ul>
            </div>
        </>
    )
}