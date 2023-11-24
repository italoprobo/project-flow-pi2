import './App.css'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ProjetosPage from './Pages/ProjetosPage'
import ProjetoPage from './Pages/ProjetoPage'
import CadastroPage from './Pages/CadastroPage'
import LoginPage from './Pages/LoginPage'
import { useMemo } from 'react'
import { useAuth } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'


function App() {

  const { signout, isAuthenticated, user } = useAuth()

  const authBlock = useMemo(() => {
    return (
      isAuthenticated ?
        <p>{user!.username}
          <button onClick={() => { signout() }}>Sair</button>
        </p>
        : <p>Olá Visitante!</p>)
  }, [isAuthenticated])

  return (
    <div>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<ProtectedRoute> <HomePage></HomePage> </ProtectedRoute>} />
          <Route path='login' element={<LoginPage></LoginPage>} />
          <Route path='cadastro' element={<CadastroPage></CadastroPage>} />
          <Route path='projetos'>
            <Route index element={<ProtectedRoute> <ProjetosPage /> </ProtectedRoute>} />
            <Route path=':id' element={<ProtectedRoute> <ProjetoPage /> </ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
