import React, { useState } from 'react';
import { Api } from '../../../providers/api';
import { CreateEquipeDto } from '../../../../../project-flow-api/src/equipe/dto/create-equipe.dto'; 

interface PopupEquipeProps {
  onClose: () => void;
}

const PopupEquipe: React.FC<PopupEquipeProps> = ({ onClose }) => {
  const [equipeData, setEquipeData] = useState<CreateEquipeDto>({
    nome: '',
    funcao: '',
    responsavelId: 0,
    projetoId: 0,
    membros: [],
    tarefas: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEquipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await Api.post('/v1/equipe', equipeData);
      onClose();
    } catch (error) {
      console.error('Erro ao criar equipe:', error);
    }
  };

  return (
    <div className="popup">
      <h2>Criar Equipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="nome" value={equipeData.nome} onChange={handleInputChange} />
        </label>
        <label>
          Função:
          <input type="text" name="funcao" value={equipeData.funcao} onChange={handleInputChange} />
        </label>
        <label>
          Responsável ID:
          <input type="number" name="responsavelId" value={equipeData.responsavelId} onChange={handleInputChange} />
        </label>
        <label>
          Projeto ID:
          <input type="number" name="projetoId" value={equipeData.projetoId} onChange={handleInputChange} />
        </label>
        {/* membros e tarefas */}
        <button type="submit">Criar Equipe</button>
      </form>
    </div>
  );
};

export default PopupEquipe;
