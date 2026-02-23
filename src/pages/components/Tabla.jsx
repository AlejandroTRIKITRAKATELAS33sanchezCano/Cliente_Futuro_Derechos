import "../../styles/tabla.css"

// Arreglo de prueba simulando los datos que llegarían de tu base de datos.
// La propiedad "activo" es tu variable booleana.
const usuarios = [
    { id: 1, nombre: "José Perez León", edad: 48, sexo: "Masculino", rfc: "RFC123", curp: "CURP123", activo: true },
    { id: 2, nombre: "María García", edad: 35, sexo: "Femenino", rfc: "RFC456", curp: "CURP456", activo: false },
    { id: 3, nombre: "Carlos Slim", edad: 50, sexo: "Masculino", rfc: "RFC789", curp: "CURP789", activo: true }
];

function Tabla() {
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
                    <th>Más información</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                        <td>{usuario.nombre}</td>
                        <td>{usuario.edad}</td>
                        <td>{usuario.sexo}</td>
                        <td>{usuario.rfc}</td>
                        <td>{usuario.curp}</td>
                        {/* Celda del estado con la clase dinámica */}
                        <td>
                            <div className={`circulo-estado ${usuario.activo ? 'activo' : 'inactivo'}`}></div>
                        </td>
                        <td className="celda-acciones">
                            {/* Botón estético con el ícono del ojo */}
                            <button className="btn-ver-detalle" title="Ver información completa">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Tabla