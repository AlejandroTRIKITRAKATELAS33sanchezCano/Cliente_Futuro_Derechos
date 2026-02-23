import "../../styles/buscador.css"
import { Link } from "react-router-dom";

function Buscador() {
    return (
        <div className="buscador">
            {/* Nuevo contenedor que le da estilo a la barra completa */}
            <div className="buscador-contenedor">
                <div className="buscador-icono">
                    {/* Ícono de Lupa en SVG */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <input 
                    type="text" 
                    placeholder="Buscar por nombre"
                    className="buscador-input"
                />
            </div>

            {/* El botón se mantiene intacto */}
            <Link to="/administrador/registrarEmpleado" className="buscador-btn">Nuevo Registro</Link>
        </div>
    )
}

export default Buscador