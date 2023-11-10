import "./CadastroPage.css"
import {BiSolidUser} from 'react-icons/bi'
import {AiFillLock, AiFillMail} from 'react-icons/ai'
import { BsFillTelephoneFill } from "react-icons/bs";
import logo from '../../assets/logo_project_flow.png'; 

const CadastroPage = () => {
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
                    <form className="campos">
                        <div className="username"><BiSolidUser/> <input type="text" placeholder="Nome"/></div>
                        <div className="telefone"><BsFillTelephoneFill/> <input type="text" placeholder="Telefone"/></div>
                        <div className="email"><AiFillMail/> <input type="text" placeholder="Email"/></div>
                        <div className="senha"><AiFillLock/> <input type="password" placeholder="Senha"/></div>
                        <button className="botaoCadastro"><b>Cadastrar</b></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CadastroPage