import "../../styles/buscador.css"
import {Link} from "react-router-dom";

function Buscador() {
    return (
        <div className="buscador">
            <input 
                type="text" 
                placeholder="Buscar..."
                className="buscador-input"
            />
            <Link to="/administrador/registrarEmpleado" className="buscador-btn">+</Link>
        </div>
    )
}

export default Buscador