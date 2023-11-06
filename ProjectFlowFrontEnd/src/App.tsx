import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './Pages/LoginPage/LoginPage'
import CadastroPage from './Pages/CadastroPage/CadastroPage'
 

function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage></LoginPage>
    }, {
      path:"/cadastro",
      element: <CadastroPage></CadastroPage>
    }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
