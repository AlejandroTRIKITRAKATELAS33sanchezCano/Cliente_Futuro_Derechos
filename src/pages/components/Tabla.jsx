import { Link } from "react-router-dom";
import "../../styles/tabla.css"

function Tabla({ usuarios }) {
    return (
        <table className="tabla-usuarios">
            <thead>
                <tr>
                    <th>Nombre Completo</th>
                    <th>Edad</th>
                    <th>Sexo</th>
                    <th>RFC</th>
                    <th>CURP</th>
                    <th>Estado</th>
                    <th>Más Información</th>
                </tr>
            </thead>
            <tbody>
                {usuarios && usuarios.length > 0 ? (
                    usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            {/* El nombre vuelve a ser solo texto normal */}
                            <td>{usuario.nombre}</td>
                            <td>{usuario.edad}</td>
                            <td>{usuario.sexo}</td>
                            <td>{usuario.rfc}</td>
                            <td>{usuario.curp}</td>
                            <td>
                                <div className={`circulo-estado ${usuario.activo ? 'activo' : 'inactivo'}`}></div>
                            </td>
                            <td className="celda-acciones">
                                {/* Cambiamos el <button> por un <Link> que usa la misma clase CSS */}
                                <Link 
                                    to={`/administrador/empleado/${usuario.id}`} 
                                    className="btn-ver-detalle" 
                                    title="Ver información completa"
                                >
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" style={{ padding: "20px", color: "#666" }}>
                            No se encontraron empleados.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Tabla;