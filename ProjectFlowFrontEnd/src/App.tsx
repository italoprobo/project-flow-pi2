import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './Pages/LoginPage/LoginPage'

function App() {

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage></LoginPage>
    }
  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
