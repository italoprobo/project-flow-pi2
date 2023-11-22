import "./style.css"
import {BiSolidUser} from 'react-icons/bi'
import {AiFillLock} from 'react-icons/ai'
import logo from '../../assets/logo_project_flow.png'; 
import { useState } from "react";
import { isAxiosError } from "axios";
import { Api } from "../../providers/api";

const LoginPage = () => {

    const [nome, setUsername] = useState('');
    const [senha, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const response = await Api.post('/auth/login', {
              nome: nome,
              senha: senha,
            });
          
            console.log('Login bem-sucedido:', response.data);
            const accessToken = response.data.access_token;
            console.log('Token de acesso:', accessToken);
          
          } catch (error) {
            if (isAxiosError(error) && error.response) {
              const errorMessage = error.response.data.message;
              console.error('Erro ao fazer login:', errorMessage);
          
              if (error.response.status === 401) {
                console.error('Credenciais inválidas.');
              }
          
            } else {
              console.error('Erro desconhecido ao fazer login:', error);
            }
          }
        }

    return(
        <div className="login_body">
            <div className="login_header">
                <div className="div_logo">
                    <img src={logo} className="logo"></img>
                </div>
            </div>
            <div className="login_main">
                <div className="login">
                    <h1>Entrar</h1>
                    <form className="login_campos" onSubmit={handleLogin}>
                        <div className="login_username"><BiSolidUser class="icon"/> <input type="text" 
                        placeholder="Email"
                        value={nome}
                        onChange={(e) => setUsername(e.target.value)}
                        /></div>

                        <div className="login_senha"><AiFillLock class="icon"/> <input type="password" 
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setPassword(e.target.value)}
                        /></div>

                        <button type="submit" className="botaoLogin"><b>Login</b></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage