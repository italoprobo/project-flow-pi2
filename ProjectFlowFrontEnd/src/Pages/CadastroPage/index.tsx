import "./style.css"
import { BiSolidUser } from 'react-icons/bi'
import { AiFillLock, AiFillMail } from 'react-icons/ai'
import logo from '../../assets/logo_project_flow.png';
import React, { useState } from "react";
import { Api } from "../../providers/api";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const CadastroPage = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const cargo = 'Usuário'

    const navigate = useNavigate()

    const [cadastroAutorizado, setCadastroAutorizado] = useState(true)

    const textoVermelho = {
        color: 'red'
    };

    const handleCadastro = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await Api.post('/auth/registrar', {
                nome,
                email,
                senha,
                cargo
            });

            console.log('Usuário registrado com sucesso:', response.data);
            navigate("/login")

        } catch (error) {
            if (isAxiosError(error) && error.response) {
                console.error('Erro ao registrar usuário:', error.response.data.message);
            } else {
                console.error('Erro desconhecido ao registrar usuário:', error);
            }

            setCadastroAutorizado(false)
        }

    };


    return (
        <div className="cadastro">
            <div className="cadastro_div_logo">
                <img src={logo} className="logo"></img>
            </div>
            <div className="cadastrar">
                <h1>Cadastro de Usuário</h1>
            </div>
            <form className="cadastro_campos" onSubmit={handleCadastro}>
                <div className="cadastro_username"><BiSolidUser className="cadastro_icon" /> <input type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                /></div>

                <div className="cadastro_email"><AiFillMail className="cadastro_icon" /> <input type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /></div>

                <div className="cadastro_senha"><AiFillLock className="cadastro_icon" /> <input type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                /></div>

                <button type="submit" className="cadastro_botaoCadastro"><b>Cadastrar</b></button>
            </form>

            {cadastroAutorizado === true ?
                <p></p> :
                <p style={textoVermelho}>E-mail em uso.</p>
            }
        </div>
    )
}

export default CadastroPage