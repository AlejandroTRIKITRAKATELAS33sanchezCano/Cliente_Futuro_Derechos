import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Header from "./components/Header";
import BuscadorSimple from "./components/BuscadorSimple";
import TablaSeleccion from "./components/TablaSeleccion";
import "../styles/ConsultarEmpleados.css"; // Reutilizamos estilos

function RegistroEquipo() {
    const [busqueda, setBusqueda] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [equipoSeleccionado, setEquipoSeleccionado] = useState([]);
    const [nombreEquipo, setNombreEquipo] = useState(""); // Para la clave del equipo (equclave)

    useEffect(() => {
        const obtenerUsuarios = async () => {
            try {
                const response = await axiosInstance.get("/usuarios");
                setUsuarios(response.data);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };
        obtenerUsuarios();
    }, []);

    // Filtrar usuarios para la tabla de búsqueda
    const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.nombre_completo?.toLowerCase().includes(busqueda.toLowerCase()) &&
        !equipoSeleccionado.find(u => u.idusuario === usuario.idusuario) // No mostrar si ya está en el equipo
    );

    // Función para añadir al equipo
    const agregarAlEquipo = (usuario) => {
        setEquipoSeleccionado([...equipoSeleccionado, usuario]);
    };

    // Función para quitar del equipo
    const quitarDelEquipo = (id) => {
        setEquipoSeleccionado(equipoSeleccionado.filter(u => u.idusuario !== id));
    };

    const guardarEquipo = async () => {
        if (!nombreEquipo || equipoSeleccionado.length === 0) {
            alert("Por favor, asigna una clave al equipo y añade al menos un integrante.");
            return;
        }

        const dataEnvio = {
            equclave: nombreEquipo,
            integrantes: equipoSeleccionado.map(u => u.idusuario)
        };

        try {
            await axiosInstance.post("/equipos", dataEnvio);
            alert("Equipo registrado con éxito");
            setEquipoSeleccionado([]);
            setNombreEquipo("");
        } catch (error) {
            console.error("Error al guardar equipo:", error);
        }
    };

    return (
        <>
            <Header />
            <section className="SeccionEmpleados">
                <h2>Crear Equipo Multidisciplinario</h2>

            <div className="contenedor-controles-equipo">
                <BuscadorSimple 
                    busqueda={busqueda} 
                    setBusqueda={setBusqueda} 
                    mostrarBoton={false} 
                />
                
                <input 
                    type="text" 
                    placeholder="Clave del equipo (ej: EQ-01)" 
                    className="input-clave-equipo"
                    value={nombreEquipo}
                    onChange={(e) => setNombreEquipo(e.target.value)}
                />
            </div>
                
                <h3>Usuarios Disponibles</h3>
                <TablaSeleccion 
                    usuarios={usuariosFiltrados} 
                    accion={agregarAlEquipo} 
                    tipoAccion="agregar" 
                />

                <hr style={{ margin: "40px 0" }} />

                <h3>Integrantes del Equipo</h3>
                <TablaSeleccion 
                    usuarios={equipoSeleccionado} 
                    accion={quitarDelEquipo} 
                    tipoAccion="quitar" 
                />

                {/* NUEVO CONTENEDOR PARA EL BOTÓN */}
                <div className="contenedor-boton-final">
                    <button 
                        className="buscador-btn btn-registrar-equipo" 
                        onClick={guardarEquipo}
                    >
                        Registrar Equipo Multidisciplinario
                    </button>
                </div>
            </section>
        </>
    );
}

export default RegistroEquipo;