import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ProjetosPage from './Pages/ProjetosPage'
import ProjetoPage from './Pages/ProjetoPage'
import CadastroPage from './Pages/CadastroPage'
import LoginPage from './Pages/LoginPage'


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<LoginPage></LoginPage>} />
          <Route path='cadastro' element={<CadastroPage></CadastroPage>} />
          <Route path='home' element={<HomePage></HomePage>} />
          <Route path='projetos'>
            <Route index element={<ProjetosPage />} />
            <Route path=':id' element={ <ProjetoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
