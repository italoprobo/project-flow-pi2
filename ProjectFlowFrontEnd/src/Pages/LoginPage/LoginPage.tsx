import "./LoginPage.css"
import {BiSolidUser} from 'react-icons/bi'
import {AiFillLock} from 'react-icons/ai'
import logo from '../../assets/logo_project_flow.png'; 

const LoginPage = () => {
    return(
        <body>
            <header>
                <div className="div_logo">
                    <img src={logo} className="logo"></img>
                </div>
            </header>
            <main>
                <div className="login">
                    <h1>Entrar</h1>
                    <form className="campos">
                        <div className="username"><BiSolidUser/> <input type="text" placeholder="Usuário"/></div>
                        <div className="senha"><AiFillLock/> <input type="password" placeholder="Senha"/></div>
                        <button className="botaoLogin"><b>Login</b></button>
                    </form>
                </div>
            </main>
            <footer>

            </footer>
        </body>
    )
}

export default LoginPage