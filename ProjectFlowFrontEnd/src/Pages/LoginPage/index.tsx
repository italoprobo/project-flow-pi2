import "./style.css"
import { BiSolidUser } from 'react-icons/bi'
import { AiFillLock } from 'react-icons/ai'
import logo from '../../assets/logo_project_flow.png';
import { useEffect, useRef, useState } from "react";
import { Api } from "../../providers/api";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUsuario } from "../../hooks";
import { isAxiosError } from "axios";
interface LoginPagePros {
  next?: string
}

export function LoginPage({ next = '/' }: LoginPagePros) {

  const { usuarios, getAllUsuarios } = useUsuario()

  useEffect(() => {
    getAllUsuarios()
  }, [])

  const { signin } = useAuth()

  const navigate = useNavigate()

  const emailInputRef = useRef<HTMLInputElement>(null)
  const senhaInputRef = useRef<HTMLInputElement>(null)

  const [loginAutorizado, setLoginAutorizado] = useState(true)

  const textoVermelho = {
    color: 'red'
  };

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()
    const email = emailInputRef.current!.value
    const senha = senhaInputRef.current!.value

    try {
      const response = await Api.post('/auth', {
        email,
        senha
      })

      signin({
        nome: response.data.nome,
        id: response.data.id,
        cargo: response.data.cargo
      })
      navigate(next)
      return
    } catch (error) {
      if (isAxiosError(error) && error.response) {
          console.error('Erro ao registrar usuário:', error.response.data.message);
      } else {
          console.error('Erro desconhecido ao registrar usuário:', error);
      }

  }

    setLoginAutorizado(false)
  }

  return (
    <div className="login_body">
      <div className="login_header">
        <div className="div_logo">
          <img src={logo} className="logo"></img>
        </div>
      </div>
      <div className="login_main">
        <div className="login">
          <h1>Entrar</h1>
          <form className="login_campos" onSubmit={handleLoginSubmit}>
            <div className="login_username"><BiSolidUser className="icon" /> <input type="text" placeholder="Email" ref={emailInputRef} /></div>
            <div className="login_senha"><AiFillLock className="icon" /> <input type="password" placeholder="Senha" ref={senhaInputRef} /></div>
            <input type="submit" className="botaoLogin" value="Login" />
          </form>
          {loginAutorizado === true ?
            <p></p> :
            <p style={textoVermelho}>Credenciais inválidas.</p>
          }
        </div>
      </div>
    </div>
  )
}

export default LoginPage