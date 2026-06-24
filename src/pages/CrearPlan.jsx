import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import "../styles/CrearPlan.css";

// Mapa de derechos: id → { titulo, marcoJuridico }
const MAPA_DERECHOS = {
    identidad:      { titulo: "Derecho a la Identidad",                                        marco: "Arts. 19, 20 y 21 LGDNNA" },
    familia:        { titulo: "Derecho a Vivir en Familia",                                     marco: "Arts. 22, 23 y 26 LGDNNA" },
    discriminacion: { titulo: "Derecho a No Ser Discriminado",                                  marco: "Art. 39 LGDNNA" },
    bienestar:      { titulo: "Derecho a Vivir en Condiciones de Bienestar y Sano Desarrollo",  marco: "Art. 43 LGDNNA" },
    violencia:      { titulo: "Derecho a una Vida Libre de Violencia e Integridad Personal",    marco: "Arts. 46, 47, 48 y 49 LGDNNA" },
    salud:          { titulo: "Derecho a la Protección de la Salud y Seguridad Social",         marco: "Arts. 50 y 51 LGDNNA" },
    discapacidad:   { titulo: "Derecho a la Inclusión de NNA con Discapacidad",                 marco: "Arts. 53 y 54 LGDNNA" },
    educacion:      { titulo: "Derecho a la Educación",                                         marco: "Art. 57 LGDNNA" },
    descanso:       { titulo: "Derecho al Descanso y al Esparcimiento",                         marco: "Arts. 60 y 61 LGDNNA" },
    intimidad:      { titulo: "Derecho a la Intimidad",                                         marco: "Art. 76 LGDNNA" },
    migrantes:      { titulo: "Derechos de NNA Migrantes",                                      marco: "Arts. 89, 90, 91 y 92 LGDNNA" },
    otras:          { titulo: "Otras Observaciones sobre la Garantía de Derechos",              marco: "" },
};

const INSTITUCIONES = [
    "Procuraduría de Protección",
    "DIF Municipal",
    "DIF Estatal",
    "Secretaría de Educación",
    "Secretaría de Salud",
    "Instituto Mexicano del Seguro Social (IMSS)",
    "Ministerio Público",
    "Poder Judicial",
    "Sistema Nacional DIF",
    "Otra institución",
];

const PERIODICIDADES = [
    "Única vez",
    "Diaria",
    "Semanal",
    "Quincenal",
    "Mensual",
    "Bimestral",
    "Trimestral",
    "Semestral",
    "Anual",
];

function crearFilaVacia(derechoVulnerado = "", marcoJuridico = "") {
    return {
        id: Date.now() + Math.random(),
        derechoVulnerado,
        marcoJuridico,
        medida: "",
        beneficiario: "",
        institucion: "",
        periodicidad: "",
    };
}

function CrearPlan() {
    const navigate = useNavigate();

    // Datos del caso
    const infoCaso = {
        nombre: "María García López",
        folio: "CASO-2026-001",
        estado: "Creación del Plan de Restitución",
    };

    // Cargamos los derechos vulnerados de la verificación anterior
    const [filas, setFilas] = useState(() => {
        try {
            const raw = sessionStorage.getItem("verificacionDerechos");
            if (!raw) return [crearFilaVacia()];

            const respuestas = JSON.parse(raw);
            const filasIniciales = [];

            Object.entries(respuestas).forEach(([derechoId, arr]) => {
                const tieneVulnerado = arr.some((v) => v === "No");
                if (tieneVulnerado && MAPA_DERECHOS[derechoId]) {
                    const info = MAPA_DERECHOS[derechoId];
                    filasIniciales.push(crearFilaVacia(info.titulo, info.marco));
                }
            });

            return filasIniciales.length > 0 ? filasIniciales : [crearFilaVacia()];
        } catch {
            return [crearFilaVacia()];
        }
    });

    const actualizarFila = (id, campo, valor) => {
        setFilas((prev) =>
            prev.map((f) => (f.id === id ? { ...f, [campo]: valor } : f))
        );
    };

    const agregarFila = () => {
        setFilas((prev) => [...prev, crearFilaVacia()]);
    };

    const eliminarFila = (id) => {
        if (filas.length === 1) return; // Al menos una fila siempre
        setFilas((prev) => prev.filter((f) => f.id !== id));
    };

    const todasCompletas = filas.every(
        (f) =>
            f.derechoVulnerado.trim() &&
            f.medida.trim() &&
            f.beneficiario.trim() &&
            f.institucion &&
            f.periodicidad
    );

    const guardarPlan = () => {
        sessionStorage.setItem("planRestitucion", JSON.stringify(filas));
        alert("Plan guardado como borrador.");
    };

    const finalizarYGenerar = () => {
        if (!todasCompletas) {
            alert("Complete todos los campos de cada medida de protección antes de continuar.");
            return;
        }
        sessionStorage.setItem("planRestitucion", JSON.stringify(filas));
        navigate("/plan-restitucion/documento");
    };

    return (
        <div className="cp-page">
            <Header />

            <main className="cp-main">
                {/* Tarjeta de info del caso */}
                <div className="cp-info-caso">
                    <div className="cp-info-campo">
                        <span className="cp-info-label">Nombre del NNA</span>
                        <span className="cp-info-valor">{infoCaso.nombre}</span>
                    </div>
                    <div className="cp-info-campo">
                        <span className="cp-info-label">Folio del Caso</span>
                        <span className="cp-info-valor">{infoCaso.folio}</span>
                    </div>
                    <div className="cp-info-campo">
                        <span className="cp-info-label">Estado Actual</span>
                        <span className="cp-info-badge">{infoCaso.estado}</span>
                    </div>
                </div>

                {/* Encabezado del constructor */}
                <div className="cp-modulo-header">
                    <h2 className="cp-modulo-titulo">Constructor del Plan de Restitución</h2>
                    <p className="cp-modulo-desc">
                        Defina las medidas de protección especial para cada derecho vulnerado identificado
                        en la evaluación diagnóstica.
                    </p>
                </div>

                {/* Tabla de medidas */}
                <div className="cp-tabla-wrapper">
                    <div className="cp-tabla">
                        {/* Encabezados */}
                        <div className="cp-tabla-header">
                            <div className="cp-th cp-col-derecho">Derecho Vulnerado</div>
                            <div className="cp-th cp-col-marco">Marco Jurídico</div>
                            <div className="cp-th cp-col-medida">Medida de Protección Especial</div>
                            <div className="cp-th cp-col-beneficiario">Beneficiario</div>
                            <div className="cp-th cp-col-institucion">Institución Responsable</div>
                            <div className="cp-th cp-col-periodicidad">Periodicidad</div>
                            <div className="cp-th cp-col-acciones">Acciones</div>
                        </div>

                        {/* Filas */}
                        {filas.map((fila) => (
                            <div key={fila.id} className="cp-tabla-fila">
                                {/* Derecho Vulnerado */}
                                <div className="cp-td cp-col-derecho">
                                    <input
                                        className="cp-input"
                                        type="text"
                                        placeholder="Ej. Falta de acta de nacim..."
                                        value={fila.derechoVulnerado}
                                        onChange={(e) => actualizarFila(fila.id, "derechoVulnerado", e.target.value)}
                                    />
                                </div>

                                {/* Marco Jurídico */}
                                <div className="cp-td cp-col-marco">
                                    <input
                                        className="cp-input"
                                        type="text"
                                        placeholder="Art. de LGDNNA, Ley local, etc."
                                        value={fila.marcoJuridico}
                                        onChange={(e) => actualizarFila(fila.id, "marcoJuridico", e.target.value)}
                                    />
                                </div>

                                {/* Medida */}
                                <div className="cp-td cp-col-medida">
                                    <input
                                        className="cp-input"
                                        type="text"
                                        placeholder="Descripción de la medida a implementar"
                                        value={fila.medida}
                                        onChange={(e) => actualizarFila(fila.id, "medida", e.target.value)}
                                    />
                                </div>

                                {/* Beneficiario */}
                                <div className="cp-td cp-col-beneficiario">
                                    <input
                                        className="cp-input"
                                        type="text"
                                        placeholder="El NNA, Madre, Padre..."
                                        value={fila.beneficiario}
                                        onChange={(e) => actualizarFila(fila.id, "beneficiario", e.target.value)}
                                    />
                                </div>

                                {/* Institución */}
                                <div className="cp-td cp-col-institucion">
                                    <select
                                        className="cp-select"
                                        value={fila.institucion}
                                        onChange={(e) => actualizarFila(fila.id, "institucion", e.target.value)}
                                    >
                                        <option value="">Seleccionar...</option>
                                        {INSTITUCIONES.map((inst) => (
                                            <option key={inst} value={inst}>{inst}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Periodicidad */}
                                <div className="cp-td cp-col-periodicidad">
                                    <select
                                        className="cp-select"
                                        value={fila.periodicidad}
                                        onChange={(e) => actualizarFila(fila.id, "periodicidad", e.target.value)}
                                    >
                                        <option value="">Seleccionar...</option>
                                        {PERIODICIDADES.map((p) => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Acciones */}
                                <div className="cp-td cp-col-acciones">
                                    <button
                                        className="cp-btn-eliminar"
                                        onClick={() => eliminarFila(fila.id)}
                                        title="Eliminar fila"
                                        disabled={filas.length === 1}
                                    >
                                        🗑
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Botón agregar fila */}
                    <button className="cp-btn-agregar" onClick={agregarFila}>
                        + Agregar nueva medida/fila al plan
                    </button>
                </div>

                {/* Aviso informativo */}
                <div className="cp-aviso">
                    <span className="cp-aviso-icono">📋</span>
                    <div>
                        <p className="cp-aviso-titulo">Información</p>
                        <p className="cp-aviso-desc">
                            Complete todos los campos de cada medida de protección. Una vez finalizado,
                            podrá generar el documento oficial del Plan de Restitución de Derechos.
                        </p>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="cp-acciones">
                    <button
                        className="cp-btn-atras"
                        onClick={() => navigate("/plan-restitucion/verificacion")}
                    >
                        ← Atrás
                    </button>

                    <div className="cp-acciones-derecha">
                        <button className="cp-btn-guardar" onClick={guardarPlan}>
                            Guardar Plan
                        </button>
                        <button
                            className={`cp-btn-finalizar ${!todasCompletas ? "cp-btn-finalizar--deshabilitado" : ""}`}
                            onClick={finalizarYGenerar}
                        >
                            📄 Finalizar y Generar Documento
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default CrearPlan;
