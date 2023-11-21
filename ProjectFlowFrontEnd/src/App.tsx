import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './Pages/LoginPage/LoginPage'
import CadastroPage from './Pages/CadastroPage/CadastroPage'
import HomePage from './Pages/HomePage'
import TaskPage from './Pages/TaskPage'
 

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
    }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
