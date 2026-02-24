import { Routes, Route} from 'react-router-dom'
import ConsultarEmpleados from './pages/ConsultarEmpleados'
import RegistrarEmpleado from './pages/RegistrarEmpleado'
import Login from './pages/Login'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      {//Rutas Administrador
      }
      <Route path='/administrador/consultarEmpleados' element={<ConsultarEmpleados/>}/>
      <Route path='/administrador/registrarEmpleado' element={<RegistrarEmpleado/>}/>
    </Routes>
  )
}


export default App
