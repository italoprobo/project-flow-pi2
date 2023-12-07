import "../../components/ProjetoListaItem"
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./styleParticipantes.css"
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import { ParticipantesLista } from "./components/ParticipantesLista";
import { useUsuario_Equipe } from "../../hooks/useUsuario_Equipe";
import { IUsuario } from "../../interfaces";
import { useUsuario } from "../../hooks";
import { useAuth } from "../../contexts/AuthContext";
import { useEquipe } from "../../hooks/useEquipe";
import { Usuario } from "../../../../project-flow-api/src/usuario/entities/usuario.entity";
import { Api } from "../../providers/api";
import { CreateUsuarioEquipeDto } from "../../../../project-flow-api/src/usuario_equipe/dto/create-usuario_equipe.dto";

const ParticipantesPage = () => {

    const { user, signout } = useAuth()

    const [footerVisible, setFooterVisible] = useState(true);

    const { usuario_equipe, findAllUser_Team } = useUsuario_Equipe()
    const { usuarios, getAllUsuarios } = useUsuario()
    const { equipe, getEquipeId } = useEquipe()

    let { id } = useParams()

    useEffect(() => {
        findAllUser_Team(),
            getAllUsuarios(),
            getEquipeId(id)
    }, [])

    const [listaUsuarios, setListaUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        const carregarUsuarios = async () => {
            try {
                const response = await Api.get<Usuario[]>("/v1/usuario");
                setListaUsuarios(response.data);
            } catch (error) {
                console.error("Erro ao carregar a lista de usuários:", error);
            }
        };

        carregarUsuarios();
    }, []);

    let usuariosForaDaEquipe: Usuario[] = []

    const usuarioIsInEquipe = (usuario: Usuario) => {
        for (let usuarioDaEquipe of usuario_equipe) {
            if (usuarioDaEquipe.usuarioId === usuario.id && usuarioDaEquipe.equipeId === equipe?.id) {
                return true
            }
        }

        return false
    }

    for (let usuario of listaUsuarios) {
        if (!usuarioIsInEquipe(usuario)) {
            usuariosForaDaEquipe.push(usuario)
        }
    }

    const toggleFooter = () => {
        setFooterVisible(!footerVisible);
    };

    const displayNone = {
        display: 'none'
    };

    let membros: IUsuario[] = []
    let membrosQuePodemSerRemovidos: IUsuario[] = []

    for (let equipe of usuario_equipe) {
        for (let usuario of usuarios) {
            if (usuario.id === equipe.usuarioId && equipe.equipeId === Number(id)) {
                if(user?.id === usuario.id) {
                    membros.push(usuario)
                } else {
                    membros.push(usuario)
                    membrosQuePodemSerRemovidos.push(usuario)
                }
            }
        }
    }

    const [usuario_equipeData, setUsuarioEquipeData] = useState<CreateUsuarioEquipeDto>({
        usuarioId: 0,
        equipeId: Number(id)
    });

    const handleMembroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUsuarioEquipeData((prevData) => ({
            ...prevData,
            [name]: parseInt(value, 10),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await Api.post('/v1/usuario_equipe', usuario_equipeData);
        } catch (error) {
            console.error('Erro ao adicionar membro na equipe:', error);
        }
        console.log("Usuário adicionado");
    };

    const [usuario_equipeRemove, setUsuarioEquipeRemove] = useState<CreateUsuarioEquipeDto>({
        usuarioId: 0,
        equipeId: Number(id)
    });

    const handleMembroRemove = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUsuarioEquipeRemove((prevData) => ({
            ...prevData,
            [name]: parseInt(value, 10),
        }));
    };

    const handleSubmitRemove = async (e: React.FormEvent) => {
        e.preventDefault();

        let idRemove: number = 0

        for (let linha of usuario_equipe) {
            if (linha.usuarioId === usuario_equipeRemove.usuarioId && linha.equipeId === usuario_equipeRemove.equipeId) {
                idRemove = linha.id
            }
        }

        try {
            if (idRemove === 0) {
                return
            }
            await Api.delete(`/v1/usuario_equipe/${idRemove}`);
        } catch (error) {
            console.error('Erro ao remover membro na equipe:', error);
        }
        console.log("Usuário removido");
    };

    return (
        <body>
            <header>
                {user?.cargo === "administrador" ?
                    <div className="head-content">
                        <div className="div_logo">
                            <Link to="/"><img src="../../../public/icon.png" alt="Logo" className="logo" /></Link>
                        </div>
                        <div className="direita">
                            <div className="botaoSair">
                                <button className="btn-sair" onClick={signout}>Sair</button>
                            </div>
                            <div className="botaoSair">
                                <Link to={"/cadastro"}><button className="btn-sair" onClick={signout}>cadastrar usuário</button></Link>
                            </div>
                        </div>
                    </div> :
                    <div className="head-content">
                        <div className="div_logo">
                            <Link to="/"><img src="../../../public/icon.png" alt="Logo" className="logo" /></Link>
                        </div>
                        <div className="direita">
                            <div className="botaoSair">
                                <button className="btn-sair" onClick={signout}>Sair</button>
                            </div>
                        </div>
                    </div>
                }
            </header>
            <main>
                <h1>Membros:</h1>
                {user?.id === equipe?.responsavel.id ?
                    <>
                        <form onSubmit={handleSubmit} className="adicionarMembro">
                            <label>
                                <select
                                    name="usuarioId"
                                    value={usuario_equipeData.usuarioId}
                                    onChange={handleMembroChange}
                                >
                                    <option value={0} disabled>Selecionar membro</option>
                                    {usuariosForaDaEquipe.map((usuario) => (
                                        <option key={usuario.id} value={usuario.id}>
                                            {usuario.nome}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <button type="submit">Adicionar</button>
                        </form>
                        <form onSubmit={handleSubmitRemove} className="removerMembro">
                            <label>
                                <select
                                    name="usuarioId"
                                    value={usuario_equipeRemove.usuarioId}
                                    onChange={handleMembroRemove}
                                >
                                    <option value={0} disabled>Selecionar membro</option>
                                    {membrosQuePodemSerRemovidos.map((usuario) => (
                                        <option key={usuario.id} value={usuario.id}>
                                            {usuario.nome}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <button type="submit">Remover</button>
                        </form></> :
                    <p></p>
                }
                <div className="participantes">
                    <ParticipantesLista usuarios={membros} />
                </div>
            </main>
            {footerVisible ?
                <footer style={displayNone}>
                    <div className="footer-content">
                        <div className="menu">
                            <Link to="/projetos"><img src="../../../public/list_icon.png" alt="Lista" className="lista" /></Link>
                            <Link to="/tarefas"><img src="../../../public/calendar_icon.png" alt="Calendario" className="calendario" /></Link>
                            <Link to="/equipes"><img src="../../../public/team_icon.png" alt="Time" className="time" /></Link>
                        </div>
                    </div>
                </footer> :
                <footer>
                    <div className="footer-content">
                        <div className="botaoBarraAbaixar">
                            <button onClick={toggleFooter}><FaCircleArrowDown /></button>
                        </div>
                        <div className="menu">
                            <Link to="/projetos"><img src="../../../public/list_icon.png" alt="Lista" className="lista" /></Link>
                            <Link to="/tarefas"><img src="../../../public/calendar_icon.png" alt="Calendario" className="calendario" /></Link>
                            <Link to="/equipes"><img src="../../../public/team_icon.png" alt="Time" className="time" /></Link>
                        </div>
                    </div>
                </footer>
            }
            {footerVisible ?
                <div className="botaoBarraSubir">
                    <button onClick={toggleFooter}><FaCircleArrowUp /></button>
                </div> :
                <div className="botaoBarraSubir" style={displayNone}>
                    <button onClick={toggleFooter}><FaCircleArrowUp /></button>
                </div>
            }
        </body >
    )
}

export default ParticipantesPage