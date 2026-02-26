import { Link } from "react-router-dom";
import "../../styles/tabla.css";

function Tabla({ usuarios = [] }) {
    if (!usuarios.length) {
        return <p>No hay usuarios para mostrar.</p>;
    }

    return (
        <table className="tabla-usuarios">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>RFC</th>
                    <th>CURP</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {usuarios.map((usuario) => (
                    <tr key={usuario.idusuario || usuario.usurfc}>
                        <td>{usuario.nombre_completo}</td>
                        <td>{usuario.usurfc}</td>
                        <td>{usuario.usucurp}</td>

                        <td>
                            <div
                                className={`circulo-estado ${
                                    usuario.usuactivo === 1 ? "activo" : "inactivo"
                                }`}
                            />
                        </td>

                        <td className="celda-acciones">
                            <button className="btn-ver-detalle">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Tabla;