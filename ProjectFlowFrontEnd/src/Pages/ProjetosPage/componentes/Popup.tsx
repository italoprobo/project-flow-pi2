import React, { useEffect, useState } from "react";
import { Api } from "../../../providers/api";

interface PopupProps {
    onClose: () => void;
}

interface Usuario {
    id: number;
    nome: string;
    // Outras propriedades dos usuários, se houver
}

interface PopupProps {
    onClose: () => void;
}

const PopupComponent: React.FC<PopupProps> = ({ onClose }) => {

    const [listaUsuarios, setListaUsuarios] = useState<Usuario[]>([]);

    const [projetoVazio, setProjetoVazio] = useState(false)
    const [descricaoVazio, setDescricaoVazio] = useState(false)
    const [usuarioVazio, setUsuarioVazio] = useState(false)
    const [dataMaior, setDataMaior] = useState(false)

    const textoVermelho = {
        color: 'red'
    };

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

    const [projetoData, setProjetoData] = useState({
        nome: "",
        descricao: "",
        dt_inicio: new Date(),
        dt_final: new Date(),
        responsavelId: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProjetoData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleResponsavelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProjetoData((prevData) => ({
            ...prevData,
            [name]: parseInt(value, 10),
        }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProjetoData((prevData) => ({
            ...prevData,
            [name]: new Date(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (projetoData.nome.trim() === "") {
            setDataMaior(false)
            setUsuarioVazio(false)
            setDescricaoVazio(false)
            setProjetoVazio(true)
            return
        }

        if (projetoData.descricao.trim() === "") {
            setDataMaior(false)
            setProjetoVazio(false)
            setUsuarioVazio(false)
            setDescricaoVazio(true)
            return
        }

        if (projetoData.dt_inicio > projetoData.dt_final) {
            setProjetoVazio(false)
            setUsuarioVazio(false)
            setDescricaoVazio(false)
            setDataMaior(true)
            return
        }

        if (projetoData.responsavelId === 0) {
            setDataMaior(false)
            setProjetoVazio(false)
            setDescricaoVazio(false)
            setUsuarioVazio(true)
            return
        }

        try {
            await Api.post("/v1/projeto", projetoData);
            console.log(projetoData);
            onClose();
        } catch (error) {
        }
    };

    return (
        <div className="popup">
            <div className="areaBotaoFechar">
                <button onClick={onClose} className="BotaoFechar">X</button>
            </div>
            <form onSubmit={handleSubmit} className="ProjetoForm">
                <label>
                    Nome:
                    <input type="text" name="nome" value={projetoData.nome} onChange={handleInputChange} className="inputNome" />
                </label>
                <label className="descricao-label">
                    Descrição:
                    <input type="text" name="descricao" value={projetoData.descricao} onChange={handleInputChange} className="inputDescricao" />
                </label>
                <label>
                    Data de Início:
                    <input
                        type="date"
                        name="dt_inicio"
                        value={projetoData.dt_inicio.toISOString().split("T")[0]}
                        onChange={handleDateChange}
                        className="datas"
                    />
                </label>
                <label>
                    Data Final:
                    <input
                        type="date"
                        name="dt_final"
                        value={projetoData.dt_final.toISOString().split("T")[0]}
                        onChange={handleDateChange}
                        className="datas"
                    />
                </label>
                <label>
                    Responsável:
                    <select
                        name="responsavelId"
                        value={projetoData.responsavelId}
                        onChange={handleResponsavelChange}
                    >
                        <option value={0} disabled>Selecione um responsável</option>
                        {listaUsuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nome}
                            </option>
                        ))}
                    </select>
                </label>
                <button className="BotaoCriarProjeto" type="submit">Criar Projeto</button>
            </form>
            {projetoVazio === false ?
                <p></p> :
                <p style={textoVermelho}>Insira o nome do projeto</p>
            }
            {descricaoVazio === false ?
                <p></p> :
                <p style={textoVermelho}>Insira a descrição do projeto</p>
            }
            {usuarioVazio === false ?
                <p></p> :
                <p style={textoVermelho}>Selecione um usuário</p>
            }
            {dataMaior === false ?
                <p></p> :
                <p style={textoVermelho}>Data final deve ser maior que inicial</p>
            }
        </div>
    );
};

export default PopupComponent;
