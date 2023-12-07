import React, { useEffect, useState } from "react";
import { Api } from "../../../providers/api";
import { useNavigate } from "react-router-dom";

interface PopupTarefaProps {
    onClose: () => void;
}

interface PopupTarefaProps {
    onClose: () => void;
    equipeId: number;
    projetoId: number;
      
}

const PopupTarefaComponent: React.FC<PopupTarefaProps> = ({ onClose, equipeId, projetoId }) => {

    const [tarefaVazio, settarefaVazio] = useState(false)
    const [descricaoVazio, setDescricaoVazio] = useState(false)
    const [usuarioVazio, setUsuarioVazio] = useState(false)
    const [dataMaior, setDataMaior] = useState(false)

    const textoVermelho = {
        color: 'red'
    };

    const [tarefaData, settarefaData] = useState({
        nome: "",
        descricao: "",
        dt_inicio: new Date(),
        dt_final: new Date(),
        EquipeId: equipeId,
        ProjetoId: projetoId,
        importancia: "",
        tempo_previsto: 0,
        isDone: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        settarefaData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTempo_PrevistoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        settarefaData((prevData) => ({
            ...prevData,
            [name]: parseInt(value, 10),
        }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        settarefaData((prevData) => ({
            ...prevData,
            [name]: new Date(value),
        }));
    };

    const handleImportanciaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        settarefaData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (tarefaData.nome.trim() === "") {
            setDataMaior(false)
            setUsuarioVazio(false)
            setDescricaoVazio(false)
            settarefaVazio(true)
            return
        }

        if (tarefaData.descricao.trim() === "") {
            setDataMaior(false)
            settarefaVazio(false)
            setUsuarioVazio(false)
            setDescricaoVazio(true)
            return
        }

        if (tarefaData.dt_inicio > tarefaData.dt_final) {
            settarefaVazio(false)
            setUsuarioVazio(false)
            setDescricaoVazio(false)
            setDataMaior(true)
            return
        }

        try {
            console.log(tarefaData);
            await Api.post("v1/tarefa", tarefaData);
            onClose();
            navigate(`/equipes/${equipeId}`)
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
                    <input type="text" name="nome" value={tarefaData.nome} onChange={handleInputChange} className="inputNome" />
                </label>
                <label className="descricao-label">
                    Descrição:
                    <input type="text" name="descricao" value={tarefaData.descricao} onChange={handleInputChange} className="inputDescricao" />
                </label>
                <label>
                    Data de Início:
                    <input
                        type="date"
                        name="dt_inicio"
                        value={tarefaData.dt_inicio.toISOString().split("T")[0]}
                        onChange={handleDateChange}
                        className="datas"
                    />
                </label>
                <label>
                    Data Final:
                    <input
                        type="date"
                        name="dt_final"
                        value={tarefaData.dt_final.toISOString().split("T")[0]}
                        onChange={handleDateChange}
                        className="datas"
                    />
                </label>
                <label>
                    Tempo previsto(minutos):
                    <input type="number" name="tempo_previsto" value={tarefaData.tempo_previsto} onChange={handleTempo_PrevistoChange} className="inputTempo_previsto" />
                </label>
                <label>
                    Importância:
                    <select
                        name="importancia"
                        value={tarefaData.importancia}
                        onChange={handleImportanciaChange}
                    >
                            <option value={0} disabled >Selecione a importância</option>
                            <option value={"Alta"} >Alta</option>
                            <option value={"Média"} >Média</option>
                            <option value={"Baixa"} >Baixa</option>
                    </select>
                </label>
                <button className="BotaoCriarProjeto" type="submit">Adicionar Tarefa</button>
            </form>
            {tarefaVazio === false ?
                <p></p> :
                <p style={textoVermelho}>Insira o nome da tarefa</p>
            }
            {descricaoVazio === false ?
                <p></p> :
                <p style={textoVermelho}>Insira a descrição da tarefa</p>
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

export default PopupTarefaComponent;
