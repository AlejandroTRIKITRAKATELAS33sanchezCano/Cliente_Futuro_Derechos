import { Routes, Route} from 'react-router-dom'
import Index from './pages/Index'
import ConsultarEmpleados from './pages/ConsultarEmpleados'
import RegistrarEmpleado from './pages/RegistrarEmpleado'
import Login from './pages/Login'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Index/>}/>
      {//Rutas Administrador
      }
      <Route path='/administrador/consultarEmpleados' element={<ConsultarEmpleados/>}/>
      <Route path='/administrador/registrarEmpleado' element={<RegistrarEmpleado/>}/>
    </Routes>
  )
}


export default App
