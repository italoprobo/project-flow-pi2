import { useUsuario_Equipe } from "../../../../hooks/useUsuario_Equipe";
import { IUsuario } from "../../../../interfaces";
import { FaTrashAlt } from "react-icons/fa";
interface UsuarioListItemProps {
    usuario: IUsuario
}

export default function ParticipantesListaItem({ usuario }: UsuarioListItemProps) {

    const {removeMember} = useUsuario_Equipe()

    return (

        <>
            <div className="cardTarefa">
                <p>Nome: {usuario.nome}</p>
            </div>
        </>

    )

};