import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Header from "./components/Header";
import "../styles/ConsultaEquipo.css";

function ConsultaEquipo() {
    const [equipos, setEquipos] = useState([]);

    useEffect(() => {
        const obtenerEquipos = async () => {
            try {
                const response = await axiosInstance.get("/equipos");
                setEquipos(response.data);
            } catch (error) {
                console.error("Error al obtener equipos:", error);
            }
        };
        obtenerEquipos();
    }, []);

    return (
        <>
            <Header />
            <section className="seccion-consulta-equipos">
                <h2 className="titulo-equipos">Equipos Multidisciplinarios</h2>
                
                <div className="contenedor-tarjetas">
                    {equipos.length === 0 ? (
                        <p style={{ textAlign: "center", width: "100%" }}>Cargando equipos o no hay equipos registrados aún...</p>
                    ) : (
                        equipos.map((equipo, index) => (
                            <div className="tarjeta-equipo" key={equipo.idequipo || index}>
                                
                                {/* Cabecera Morada con el Título del Equipo */}
                                <div className="tarjeta-cabecera">
                                    <h3>{equipo.equclave}</h3>
                                </div>

                                {/* Cuerpo Blanco con la información y botón dorado */}
                                <div className="tarjeta-cuerpo">
                                    <div className="lista-integrantes">
                                        <p className="subtitulo-lista">Integrantes:</p>
                                        {equipo.integrantes && equipo.integrantes.length > 0 ? (
                                            equipo.integrantes.map((integrante, i) => (
                                                <p key={i} className="integrante-item">
                                                    • {integrante.nombre_completo}
                                                </p>
                                            ))
                                        ) : (
                                            <p className="integrante-item">Sin integrantes</p>
                                        )}
                                    </div>

                                    <button className="btn-ver-mas">Ver Detalles</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </>
    );
}

export default ConsultaEquipo;