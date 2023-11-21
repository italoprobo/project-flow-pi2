import "./styleLogin.css"
import {BiSolidUser} from 'react-icons/bi'
import {AiFillLock} from 'react-icons/ai'
import logo from '../../assets/logo_project_flow.png'; 

const LoginPage = () => {
    return(
        <body>
              <div className="login_div_logo">
                    <img src={logo} className="login_logo"></img>
                </div>
            <div className="login_main">
                <div className="login">
                    <h1>Entrar</h1>
                    <form className="login_campos">
                        <div className="login_username"><BiSolidUser/> <input type="text" placeholder="Usuário"/></div>
                        <div className="login_senha"><AiFillLock/> <input type="password" placeholder="Senha"/></div>
                        <button className="login_botao"><b>Login</b></button>
                    </form>
                </div>
            </div>
        </body>
    )
}

export default LoginPage