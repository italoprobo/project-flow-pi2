import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import CadastroPage from './Pages/CadastroPage'
import HomePage from './Pages/HomePage'
import TaskPage from './Pages/TaskPage'
import ProjetosPage from './Pages/ProjetosPage'
 

function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage></LoginPage>
    }, {
      path:"/cadastro",
      element: <CadastroPage></CadastroPage>
    }, {
      path: "/home",
      element: <HomePage></HomePage>
    }, {
      path: "/tarefas",
      element: <TaskPage/>
    }, {
      path: "/projetos",
      element: <ProjetosPage></ProjetosPage>
    }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
