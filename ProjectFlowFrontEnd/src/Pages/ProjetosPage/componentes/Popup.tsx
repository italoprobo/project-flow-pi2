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

        try {
            await Api.post("/v1/projeto", projetoData);
            console.log(projetoData);
            onClose();
        } catch (error) {
            console.log(projetoData);
            console.error("Erro ao criar projeto:", error);
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
        </div>
    );
};

export default PopupComponent;
