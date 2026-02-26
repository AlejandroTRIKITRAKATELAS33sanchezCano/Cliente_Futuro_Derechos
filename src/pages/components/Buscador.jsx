import "../../styles/buscador.css"
import { Link } from "react-router-dom";

// Recibimos las props que mandó ConsultarEmpleados
function Buscador({ busqueda, setBusqueda }) {
    return (
        <div className="buscador">
            <div className="buscador-contenedor">
                <div className="buscador-icono">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <input 
                    type="text" 
                    placeholder="Buscar por nombre"
                    className="buscador-input"
                    value={busqueda} // El valor es el estado que viene del padre
                    onChange={(e) => setBusqueda(e.target.value)} // Actualiza el estado al escribir
                />
            </div>

            <Link to="/administrador/registrarEmpleado" className="buscador-btn">Nuevo Registro</Link>
        </div>
    )
}

export default Buscador;