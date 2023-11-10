import "./style.css"

const HomePage = () => {
    return(
    <body>
        <header>
        <div className="head-content">
            <div className="div_logo">
                <img src="../../../public/icon.png" alt="Logo" className="logo"/>
            </div>
            <div className="div_account">
                <img src="../../../public/account.png" alt="Conta" className="conta_icon"/>
            </div>
        </div>
        </header>
        <main>
            <div className="div_saudacao">
                <h1>Olá, Nicolas.</h1>
                <p>Essas são as tarefas que você deve executar agora:</p>
            </div> 
            <div className="div_lista_tarefas">

            </div>
            <div className="div_lista_reunioes">

            </div>
        </main>
        <footer>
            <div className="footer-content">
                <div className="menu">
                    <a href=""><img src="../../../public/list_icon.png" alt="Rojao" className="logo"/></a>
                    <a href=""><img src="../../../public/calendar_icon.png" alt="Oi" className="teste"/></a>
                    <a href=""><img src="../../../public/team_icon.png" alt="Tchau" className="teste"/></a>
                </div>
            </div>
        </footer>
    </body>
    )
}

export default HomePage