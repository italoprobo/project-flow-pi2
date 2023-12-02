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
import EquipePage from './Pages/EquipePage'
import ParticipantesPage from './Pages/ParticipantesPage'
import EquipesPage from './Pages/EquipesPage'
import TarefasPage from './Pages/TarefasPage'


function App() {

  const { signout, isAuthenticated, user } = useAuth()

  const authBlock = useMemo(() => {
    return (
      isAuthenticated ?
        <p>{user!.nome}
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
          <Route path='equipes'>
            <Route index element={<ProtectedRoute> <EquipesPage /> </ProtectedRoute>} />
            <Route path=':id' element={<ProtectedRoute> <EquipePage /> </ProtectedRoute>} />
          </Route>
          <Route path='participantes'>
            <Route path='id' element={<ProtectedRoute> <ParticipantesPage /> </ProtectedRoute>} />
          </Route>
          <Route path='/tarefas' element={<ProtectedRoute> <TarefasPage></TarefasPage> </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
