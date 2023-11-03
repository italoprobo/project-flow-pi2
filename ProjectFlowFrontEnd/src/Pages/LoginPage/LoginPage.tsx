import "./LoginPage.css"
import {BiSolidUser} from 'react-icons/bi'
import {AiFillLock} from 'react-icons/ai'

const LoginPage = () => {
    return(
        <div className="login">
            <div className="card">
                <div className="entrar">
                <h1>Entrar</h1>
                </div>
                <div className="rigth">
                    <form className="campos">
                        <div className="username"><BiSolidUser/> <input type="text" placeholder="Username"/></div>
                        <div className="senha"><AiFillLock/> <input type="password" placeholder="Senha"/></div>
                        <button className="botaoLogin"><b>Login</b></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage