import React, { useEffect, useState } from 'react';
import { Api } from '../../../providers/api';
import { CreateEquipeDto } from '../../../../../project-flow-api/src/equipe/dto/create-equipe.dto'; 
import { Usuario } from '../../../../../project-flow-api/src/usuario/entities/usuario.entity';

interface PopupEquipeProps {
  onClose: () => void;
  projetoId: number;
}

const PopupEquipe: React.FC<PopupEquipeProps> = ({ onClose, projetoId }) => {
  const [equipeData, setEquipeData] = useState<CreateEquipeDto>({
    nome: '',
    funcao: '',
    responsavelId: 0,
    projetoId: projetoId,
    membros: [],
    tarefas: [],
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEquipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResponsavelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEquipeData((prevData) => ({
        ...prevData,
        [name]: parseInt(value, 10),
    }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await Api.post('/v1/equipe', equipeData);
      onClose();
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
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
          Responsável:
                    <select
                        name="responsavelId"
                        value={equipeData.responsavelId}
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
        <button type="submit">Criar Equipe</button>
      </form>
    </div>
  );
};

export default PopupEquipe;
