import { Routes, Route} from 'react-router-dom'
import ConsultarEmpleados from './pages/ConsultarEmpleados'
import RegistrarEmpleado from './pages/RegistrarEmpleado'
import InfoEmpleado from './pages/InfoEmpleado'
import Login from './pages/Login'
import RegistroEquipo from './pages/RegistroEquipo'
import ConsultaEquipo from './pages/ConsultaEquipo'
import RutasProtegidas from './pages/components/RutasProtegidas'
import CuestionarioEvaluacion from './pages/CuestionarioEvaluacion'
import VerificacionDerechos from './pages/VerificacionDerechos'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />

      {/* Rutas Administrador */}
      <Route
        path='/administrador/consultarEmpleados'
        element={
          <RutasProtegidas allowedRoles={[1, 2]}>
            <ConsultarEmpleados />
          </RutasProtegidas>
        }
      />

      <Route
        path='/administrador/registrarEmpleado'
        element={
          <RutasProtegidas allowedRoles={[1, 2]}>
            <RegistrarEmpleado />
          </RutasProtegidas>
        }
      />

      <Route
        path='/administrador/InfoEmpleado/:id'
        element={
          <RutasProtegidas allowedRoles={[1, 2]}>
            <InfoEmpleado />
          </RutasProtegidas>
        }
      />
      <Route path='/administrador/registroEquipo' element={<RegistroEquipo/>}/>
      <Route path='/administrador/consultaEquipo' element={<ConsultaEquipo/>}/>

      {/* Módulo Plan de Restitución */}
      <Route
        path='/plan-restitucion/cuestionario'
        /*element={
          <RutasProtegidas allowedRoles={[1, 2]}>
            <CuestionarioEvaluacion />
          </RutasProtegidas>
        }*/
       element={<CuestionarioEvaluacion/>}
      />
      <Route
        path='/plan-restitucion/verificacion'
        /*element={
          <RutasProtegidas allowedRoles={[1, 2]}>
            <VerificacionDerechos />
          </RutasProtegidas>
        }*/

          element={<VerificacionDerechos/>}
      />
    </Routes>
  )
}


export default App
