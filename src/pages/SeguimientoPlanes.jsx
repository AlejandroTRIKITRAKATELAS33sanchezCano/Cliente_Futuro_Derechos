import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import "../styles/SeguimientoPlanes.css";

// Datos de prueba (en producción vendrán de tu base de datos PostgreSQL)
const CASOS_INICIALES = [
    {
        id: 1,
        nombre: "María García López",
        folio: "Caso 001-2026",
        fecha: "15/04/2026",
        estado: "esperando",
    },
    {
        id: 2,
        nombre: "Juan Pérez Martínez",
        folio: "Caso 002-2026",
        fecha: "20/04/2026",
        estado: "en_proceso",
    },
    {
        id: 3,
        nombre: "Ana Rodríguez Sánchez",
        folio: "Caso 003-2026",
        fecha: "25/04/2026",
        estado: "cerrados",
    },
];

function SeguimientoPlanes() {
    const navigate = useNavigate();
    const [casos, setCasos] = useState(CASOS_INICIALES);

    // Agrupamos los casos por su estado
    const casosEsperando = casos.filter((c) => c.estado === "esperando");
    const casosEnProceso = casos.filter((c) => c.estado === "en_proceso");
    const casosCerrados = casos.filter((c) => c.estado === "cerrados");

    const handleNuevoPlan = () => {
        // Aquí puedes redirigir a la ruta de creación de planes
        navigate("/plan-restitucion/nuevo");
    };

    return (
        <div className="kanban-page">
            {/* Se reutiliza tu Header original que ya incluye los logos */}
            <Header />

            <main className="kanban-main">
                {/* Título y Botón de Acción */}
                <div className="kanban-toolbar">
                    <h1 className="kanban-titulo">Seguimiento de Planes de Restitución</h1>
                    <button className="kanban-btn-nuevo" onClick={handleNuevoPlan}>
                        + Nuevo Plan
                    </button>
                </div>

                <hr className="kanban-divisor" />

                {/* Tablero Kanban */}
                <div className="kanban-board">
                    {/* Columna: Esperando */}
                    <div className="kanban-columna kanban-columna--esperando">
                        <div className="kanban-columna-header">
                            <h2>Esperando</h2>
                            <span className="kanban-contador">({casosEsperando.length})</span>
                        </div>
                        <div className="kanban-columna-body">
                            {casosEsperando.map((caso) => (
                                <TarjetaCaso key={caso.id} caso={caso} />
                            ))}
                        </div>
                    </div>

                    {/* Columna: En Proceso */}
                    <div className="kanban-columna kanban-columna--en-proceso">
                        <div className="kanban-columna-header">
                            <h2>En Proceso</h2>
                            <span className="kanban-contador">({casosEnProceso.length})</span>
                        </div>
                        <div className="kanban-columna-body">
                            {casosEnProceso.map((caso) => (
                                <TarjetaCaso key={caso.id} caso={caso} />
                            ))}
                        </div>
                    </div>

                    {/* Columna: Cerrados */}
                    <div className="kanban-columna kanban-columna--cerrados">
                        <div className="kanban-columna-header">
                            <h2>Cerrados</h2>
                            <span className="kanban-contador">({casosCerrados.length})</span>
                        </div>
                        <div className="kanban-columna-body">
                            {casosCerrados.map((caso) => (
                                <TarjetaCaso key={caso.id} caso={caso} />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Componente individual para las tarjetas
function TarjetaCaso({ caso }) {
    return (
        <div className="kanban-tarjeta">
            <h3 className="kanban-tarjeta-nombre">{caso.nombre}</h3>
            <div className="kanban-tarjeta-detalles">
                <p>Caso: {caso.folio}</p>
                <p>Fecha: {caso.fecha}</p>
            </div>
        </div>
    );
}

export default SeguimientoPlanes;