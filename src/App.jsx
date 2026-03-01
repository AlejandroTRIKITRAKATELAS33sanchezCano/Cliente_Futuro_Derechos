import { Routes, Route} from 'react-router-dom'
import ConsultarEmpleados from './pages/ConsultarEmpleados'
import RegistrarEmpleado from './pages/RegistrarEmpleado'
import InfoEmpleado from './pages/InfoEmpleado'
import Login from './pages/Login'
import RegistroEquipo from './pages/RegistroEquipo'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      {//Rutas Administrador
      }
      <Route path='/administrador/consultarEmpleados' element={<ConsultarEmpleados/>}/>
      <Route path='/administrador/registrarEmpleado' element={<RegistrarEmpleado/>}/>
      <Route path='/administrador/InfoEmpleado/:id' element={<InfoEmpleado/>}/>
      <Route path='/administrador/registroEquipo' element={<RegistroEquipo/>}/>
    </Routes>
  )
}


export default App
