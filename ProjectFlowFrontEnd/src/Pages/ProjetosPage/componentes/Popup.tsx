import React, { useState } from "react";
import { Api } from "../../../providers/api";

interface PopupProps {
    onClose: () => void;
}

const PopupComponent: React.FC<PopupProps> = ({ onClose }) => {
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
            onClose();
        } catch (error) {
            console.error("Erro ao criar projeto:", error);
        }
    };

    return (
        <div className="popup">
            <div className="content">
                <h2>Criar Projeto</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" name="nome" value={projetoData.nome} onChange={handleInputChange} />
                </label>
                <label>
                    Descrição:
                    <input type="text" name="descricao" value={projetoData.descricao} onChange={handleInputChange} />
                </label>
                <label>
                    Data de Início:
                    <input
                        type="date"
                        name="dt_inicio"
                        value={projetoData.dt_inicio.toISOString().split("T")[0]}
                        onChange={handleDateChange}
                    />
                </label>
                <label>
                    Data Final:
                    <input
                        type="date"
                        name="dt_final"
                        value={projetoData.dt_final.toISOString().split("T")[0]}
                        onChange={handleDateChange}
                    />
                </label>
                <label>
                    Responsável ID:
                    <input type="number" name="responsavelId" value={projetoData.responsavelId} onChange={handleInputChange} />
                </label>
                <button type="submit">Criar Projeto</button>
            </form>
        </div>
    );
};

export default PopupComponent;
