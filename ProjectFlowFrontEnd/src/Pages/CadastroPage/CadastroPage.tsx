import "./CadastroPage.css"
import {BiSolidUser} from 'react-icons/bi'
import {AiFillLock, AiFillMail} from 'react-icons/ai'
import { BsFillTelephoneFill } from "react-icons/bs";
import logo from '../../assets/logo_project_flow.png'; 
import React, { useState } from "react";
import { Api } from "../../providers/api";
import { isAxiosError } from "axios";

const CadastroPage = () => {

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleCadastro = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          const response = await Api.post('/auth/registrar', {
            nome,
            telefone,
            email,
            senha,
          });
    
          console.log('Usuário registrado com sucesso:', response.data);
    
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                console.error('Erro ao registrar usuário:', error.response.data.message);
            } else {
                console.error('Erro desconhecido ao registrar usuário:', error);
            }
        }

      };
    

    return(
        <div className="cadastro">
            <div className="card">
                <div className="div_logo">
                    <img src={logo} className="logo"></img>
                </div>
                <div className="cadastrar">
                    <h1>Cadastro de Usuário</h1>
                </div>
                <div className="rigth">
                    <form className="campos" onSubmit={handleCadastro}>
                        <div className="username"><BiSolidUser/> <input type="text"
                        placeholder="Nome" 
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        /></div>

                        <div className="telefone"><BsFillTelephoneFill/> <input type="text" 
                        placeholder="Telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        /></div>

                        <div className="email"><AiFillMail/> <input type="text" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        /></div>

                        <div className="senha"><AiFillLock/> <input type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        /></div>

                        <button type="submit" className="botaoCadastro"><b>Cadastrar</b></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CadastroPage