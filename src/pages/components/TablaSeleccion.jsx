import "../../styles/tabla.css";

function TablaSeleccion({ usuarios = [], accion, tipoAccion }) {
    if (!usuarios.length) {
        return <p style={{ textAlign: "center", padding: "20px" }}>No hay usuarios seleccionados.</p>;
    }

    return (
        <table className="tabla-usuarios">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>RFC</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {usuarios.map((usuario) => (
                    <tr key={usuario.idusuario}>
                        <td>{usuario.nombre_completo}</td>
                        <td>{usuario.usurfc}</td>
                        <td>
                            <div className={`circulo-estado ${usuario.usuactivo === 1 ? "activo" : "inactivo"}`} />
                        </td>
                        <td>
                            <button 
                                onClick={() => accion(tipoAccion === "agregar" ? usuario : usuario.idusuario)}
                                className={tipoAccion === "agregar" ? "btn-agregar" : "btn-quitar"}
                                style={{
                                    border: "none",
                                    background: "none",
                                    cursor: "pointer",
                                    fontSize: "1.5rem",
                                    color: tipoAccion === "agregar" ? "#28a745" : "#dc3545"
                                }}
                            >
                                {tipoAccion === "agregar" ? "+" : "−"}
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TablaSeleccion;