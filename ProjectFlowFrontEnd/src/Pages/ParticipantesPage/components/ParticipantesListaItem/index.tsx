import { IUsuario } from "../../../../interfaces";

interface UsuarioListItemProps {
    usuario: IUsuario
}

export default function ParticipantesListaItem({ usuario }: UsuarioListItemProps) {

    return (

        <>
            <div className="cardEquipe">
                <p>Nome: {usuario.nome}</p>
            </div>
        </>

    )

};