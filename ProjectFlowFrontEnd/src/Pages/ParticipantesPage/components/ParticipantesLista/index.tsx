import { IUsuario } from "../../../../interfaces";
import ParticipantesListaItem from "../ParticipantesListaItem";

interface UsuarioListProps {
    usuarios: IUsuario[]
}

export function ParticipantesLista({ usuarios }: UsuarioListProps) {
    return (
        <>
            <div className="ListaParticipantes">
                <ul>
                    {usuarios.map(usuario => <ParticipantesListaItem key={usuario.id} usuario={usuario} />)}
                </ul>
            </div>
        </>
    )
}