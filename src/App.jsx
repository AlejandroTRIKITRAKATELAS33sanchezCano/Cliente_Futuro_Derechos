import { Routes, Route} from 'react-router-dom'
import Index from './pages/Index'
import ConsultarEmpleados from './pages/ConsultarEmpleados'
import RegistrarEmpleado from './pages/RegistrarEmpleado'
<<<<<<< HEAD
import Hola from './pages/Hola'
=======
import Login from './pages/Login'
>>>>>>> Ramses

function App() {

  return (
    <Routes>
      <Route path='/' element={<Index/>}/>
      {//Rutas Administrador
      }
      <Route path='/administrador/consultarEmpleados' element={<ConsultarEmpleados/>}/>
      <Route path='/administrador/registrarEmpleado' element={<RegistrarEmpleado/>}/>
      <Route path='/Hola' element={<Hola/>}/>
    </Routes>
  )
}


export default App
