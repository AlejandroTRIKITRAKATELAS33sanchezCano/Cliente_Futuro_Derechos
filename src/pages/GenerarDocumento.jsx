import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import "../styles/GenerarDocumento.css";

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────
function hoy() {
    return new Date().toLocaleDateString("es-MX", {
        year: "numeric", month: "long", day: "numeric",
    });
}

// ──────────────────────────────────────────────
// Componente de sección colapsable
// ──────────────────────────────────────────────
function Seccion({ numero, titulo, abierto, onToggle, children }) {
    return (
        <div className="gd-seccion">
            <div className="gd-seccion-header" onClick={onToggle}>
                <div className="gd-seccion-titulo-grupo">
                    <span className="gd-seccion-num">{numero}.</span>
                    <span className="gd-seccion-titulo">{titulo}</span>
                </div>
                <span className="gd-chevron">{abierto ? "∧" : "∨"}</span>
            </div>
            {abierto && <div className="gd-seccion-cuerpo">{children}</div>}
        </div>
    );
}

// ──────────────────────────────────────────────
// Componente principal
// ──────────────────────────────────────────────
function GenerarDocumento() {
    const navigate = useNavigate();

    // Datos del caso
    const infoCaso = {
        nombre: "María García López",
        folio: "CASO-2026-001",
        estado: "Generación del Documento",
    };

    // Recuperamos las medidas del plan construido
    const [medidas, setMedidas] = useState(() => {
        try {
            const raw = sessionStorage.getItem("planRestitucion");
            return raw ? JSON.parse(raw) : [];
        } catch { return []; }
    });

    // Secciones abiertas/cerradas
    const [abiertos, setAbiertos] = useState({
        portada: true,
        s1: true, s2: true, s3: true,
        s4: true, s5: true, s6: true, s7: true,
    });

    const toggle = (key) => setAbiertos((p) => ({ ...p, [key]: !p[key] }));

    // Estado del formulario del documento
    const [doc, setDoc] = useState({
        // Portada
        lugar: "",
        caso: infoCaso.folio,
        elaboradoPor: "",
        fecha: hoy(),
        // Sección 1
        contextoGeneral: "",
        // Sección 2
        deteccionCaso: "",
        // Sección 3
        integrantesFamilia: "",
        contextoFamilia: "",
        contextNNA: "",
        razonamiento: "",
        // Sección 4
        gradoCoercion: "",
        // Sección 5 → se construye desde las medidas
        // Sección 6
        marcoJuridico: "",
        // Sección 7
        seguimiento: "",
        calendarizacion: "",
        lugarFirma: "",
        fechaFirma: hoy(),
    });

    const set = (campo, valor) =>
        setDoc((p) => ({ ...p, [campo]: valor }));

    // ── Tabla de medidas (sección 5) — editable inline
    const [medidasDoc, setMedidasDoc] = useState(medidas);

    const actualizarMedida = (id, campo, valor) => {
        setMedidasDoc((prev) =>
            prev.map((m) => (m.id === id ? { ...m, [campo]: valor } : m))
        );
    };

    // ── Guardar borrador del documento
    const guardarDocumento = () => {
        sessionStorage.setItem("documentoPlan", JSON.stringify({ doc, medidasDoc }));
        alert("Documento guardado como borrador.");
    };

    // ── Imprimir / exportar
    const imprimirDocumento = () => {
        window.print();
    };

    return (
        <div className="gd-page">
            <Header />

            <main className="gd-main">
                {/* Info del caso */}
                <div className="gd-info-caso">
                    <div className="gd-info-campo">
                        <span className="gd-info-label">Nombre del NNA</span>
                        <span className="gd-info-valor">{infoCaso.nombre}</span>
                    </div>
                    <div className="gd-info-campo">
                        <span className="gd-info-label">Folio del Caso</span>
                        <span className="gd-info-valor">{infoCaso.folio}</span>
                    </div>
                    <div className="gd-info-campo">
                        <span className="gd-info-label">Estado Actual</span>
                        <span className="gd-info-badge">{infoCaso.estado}</span>
                    </div>
                    <div className="gd-info-acciones">
                        <button className="gd-btn-imprimir" onClick={imprimirDocumento}>
                            🖨 Imprimir / Exportar PDF
                        </button>
                    </div>
                </div>

                {/* Encabezado del módulo */}
                <div className="gd-modulo-header">
                    <h2 className="gd-modulo-titulo">Generador del Plan de Restitución de Derechos</h2>
                    <p className="gd-modulo-desc">
                        Complete cada sección del documento oficial. Los campos pre-llenados provienen de
                        las etapas anteriores. Puede editarlos libremente antes de imprimir o exportar.
                    </p>
                </div>

                {/* ─────────────────────────────────
                    PORTADA DEL DOCUMENTO
                ───────────────────────────────── */}
                <Seccion
                    numero="Portada"
                    titulo="Datos de identificación del documento"
                    abierto={abiertos.portada}
                    onToggle={() => toggle("portada")}
                >
                    <div className="gd-portada">
                        <div className="gd-portada-logos">
                            <p className="gd-nota-logos">
                                📌 Los logos institucionales estatales/municipales/locales serán impresos en esta sección.
                            </p>
                        </div>
                        <div className="gd-portada-titulo-doc">
                            Plan de Restitución de Derechos de la Niña, Niño o Adolescente
                        </div>
                        <div className="gd-portada-campos">
                            <div className="gd-campo-grupo">
                                <label className="gd-label">Lugar</label>
                                <input className="gd-input" placeholder="Ej. Monterrey, Nuevo León" value={doc.lugar} onChange={e => set("lugar", e.target.value)} />
                            </div>
                            <div className="gd-campo-grupo">
                                <label className="gd-label">Caso</label>
                                <input className="gd-input" value={doc.caso} onChange={e => set("caso", e.target.value)} />
                            </div>
                            <div className="gd-campo-grupo gd-campo-ancho">
                                <label className="gd-label">Elaborado por (nombre, apellido y cargo)</label>
                                <input className="gd-input" placeholder="Ej. Lic. Juan Pérez González, Coordinador de Casos" value={doc.elaboradoPor} onChange={e => set("elaboradoPor", e.target.value)} />
                            </div>
                            <div className="gd-campo-grupo">
                                <label className="gd-label">Fecha</label>
                                <input className="gd-input" value={doc.fecha} onChange={e => set("fecha", e.target.value)} />
                            </div>
                        </div>
                        <div className="gd-portada-intro">
                            <p className="gd-texto-intro">
                                El presente documento tiene como objetivo señalar de manera explícita y detallada las medidas de protección especial que familiares, órganos comunitarios, autoridades asistenciales, ministeriales, judiciales deben llevar a cabo para resarcir y salvaguardar en su totalidad los derechos que han sido vulnerados a la niña, niño o adolescente <strong>{infoCaso.nombre}</strong>, con el fin de lograr un entorno propicio para un desarrollo integral y el pleno goce de todos sus derechos. Dicho documento está compuesto por los siguientes elementos:
                            </p>
                            <ol className="gd-indice">
                                <li>Contexto general</li>
                                <li>Detección del caso</li>
                                <li>Diagnóstico del caso</li>
                                <li>Grado de coerción necesario para garantizar la protección de la NNA</li>
                                <li>Medidas de protección especial para la restitución integral para la NNA</li>
                                <li>Marco jurídico</li>
                                <li>Seguimiento y evaluación (calendarización)</li>
                            </ol>
                        </div>
                    </div>
                </Seccion>

                {/* ─────────────────────────────────
                    SECCIÓN 1: Contexto general
                ───────────────────────────────── */}
                <Seccion numero="1" titulo="Contexto General" abierto={abiertos.s1} onToggle={() => toggle("s1")}>
                    <p className="gd-instruccion">
                        Descripción puntual sobre los recursos comunitarios, económicos, de infraestructura, materiales, humanos, educativos, de salud, culturales, etc., con los que cuenta la ciudad, localidad o municipio donde se desarrolla el caso.
                    </p>
                    <textarea
                        className="gd-textarea gd-textarea--lg"
                        placeholder="Describa el contexto general del municipio o localidad donde se desarrolla el caso..."
                        value={doc.contextoGeneral}
                        onChange={e => set("contextoGeneral", e.target.value)}
                    />
                </Seccion>

                {/* ─────────────────────────────────
                    SECCIÓN 2: Detección del caso
                ───────────────────────────────── */}
                <Seccion numero="2" titulo="Detección del Caso" abierto={abiertos.s2} onToggle={() => toggle("s2")}>
                    <p className="gd-instruccion">
                        Descripción del dónde y cómo se conoció el caso.
                    </p>
                    <textarea
                        className="gd-textarea gd-textarea--md"
                        placeholder="Describa cómo y dónde fue detectado el caso..."
                        value={doc.deteccionCaso}
                        onChange={e => set("deteccionCaso", e.target.value)}
                    />
                </Seccion>

                {/* ─────────────────────────────────
                    SECCIÓN 3: Diagnóstico
                ───────────────────────────────── */}
                <Seccion numero="3" titulo="Diagnóstico con la Niña, Niño o Adolescente y la Familia" abierto={abiertos.s3} onToggle={() => toggle("s3")}>
                    <p className="gd-instruccion">
                        Resumen de la información relevante obtenida: integrantes de la familia, dónde y cómo vive, condición socioeconómica, redes de apoyo familiares o comunitarias, descripción de la problemática, necesidades, carencias.
                    </p>

                    <div className="gd-subseccion">
                        <h4 className="gd-subtitulo">a) Integrantes de la familia</h4>
                        <p className="gd-instruccion-sm">Ej: Mamá: [nombre] – [edad] / Padre: [nombre] – [edad] / NNA: [nombre] – [edad]</p>
                        <textarea
                            className="gd-textarea gd-textarea--md"
                            placeholder="Liste los integrantes de la familia con nombre y edad..."
                            value={doc.integrantesFamilia}
                            onChange={e => set("integrantesFamilia", e.target.value)}
                        />
                    </div>

                    <div className="gd-subseccion">
                        <h4 className="gd-subtitulo">b) Contexto general de la familia</h4>
                        <textarea
                            className="gd-textarea gd-textarea--md"
                            placeholder="Describa la situación general de la familia..."
                            value={doc.contextoFamilia}
                            onChange={e => set("contextoFamilia", e.target.value)}
                        />
                    </div>

                    <div className="gd-subseccion">
                        <h4 className="gd-subtitulo">c) Contexto general de la NNA</h4>
                        <textarea
                            className="gd-textarea gd-textarea--md"
                            placeholder="Describa la situación particular de la NNA..."
                            value={doc.contextNNA}
                            onChange={e => set("contextNNA", e.target.value)}
                        />
                    </div>

                    <div className="gd-subseccion">
                        <h4 className="gd-subtitulo">d) Razonamiento sobre la problemática</h4>
                        <textarea
                            className="gd-textarea gd-textarea--md"
                            placeholder="Explique el análisis y razonamiento del equipo sobre la problemática identificada..."
                            value={doc.razonamiento}
                            onChange={e => set("razonamiento", e.target.value)}
                        />
                    </div>
                </Seccion>

                {/* ─────────────────────────────────
                    SECCIÓN 4: Grado de coerción
                ───────────────────────────────── */}
                <Seccion numero="4" titulo="Grado de Coerción Determinado por el Equipo Multidisciplinario" abierto={abiertos.s4} onToggle={() => toggle("s4")}>
                    <p className="gd-instruccion">
                        Justificación en base a gravedad y negación. Indique si requiere: intervención penal; intervención de autoridades judiciales; oficialización con firma de la familia y equipo de la Procuraduría de Protección solamente.
                    </p>
                    <textarea
                        className="gd-textarea gd-textarea--md"
                        placeholder="Justifique el grado de coerción determinado por el equipo multidisciplinario..."
                        value={doc.gradoCoercion}
                        onChange={e => set("gradoCoercion", e.target.value)}
                    />
                </Seccion>

                {/* ─────────────────────────────────
                    SECCIÓN 5: Medidas de protección
                ───────────────────────────────── */}
                <Seccion numero="5" titulo="Medidas de Protección Especial del Plan de Restitución" abierto={abiertos.s5} onToggle={() => toggle("s5")}>
                    <p className="gd-instruccion">
                        Las medidas de protección especial necesarias para la restitución de derechos se enumeran en el cuadro a continuación, conteniendo el derecho vulnerado, el sustento legal, la descripción de la acción, el o la beneficiaria, la institución a cargo y la periodicidad de seguimiento.
                    </p>

                    {medidasDoc.length === 0 ? (
                        <p className="gd-sin-medidas">
                            No se encontraron medidas del paso anterior. Regrese al Constructor del Plan para agregarlas.
                        </p>
                    ) : (
                        <div className="gd-tabla-medidas-wrapper">
                            <table className="gd-tabla-medidas">
                                <thead>
                                    <tr>
                                        <th>Derecho Vulnerado</th>
                                        <th>Marco Jurídico</th>
                                        <th>Medida de Protección Especial</th>
                                        <th>Beneficiario</th>
                                        <th>Institución Responsable</th>
                                        <th>Periodicidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medidasDoc.map((m) => (
                                        <tr key={m.id}>
                                            <td>
                                                <textarea className="gd-cell-textarea" value={m.derechoVulnerado}
                                                    onChange={e => actualizarMedida(m.id, "derechoVulnerado", e.target.value)} />
                                            </td>
                                            <td>
                                                <textarea className="gd-cell-textarea" value={m.marcoJuridico}
                                                    onChange={e => actualizarMedida(m.id, "marcoJuridico", e.target.value)} />
                                            </td>
                                            <td>
                                                <textarea className="gd-cell-textarea" value={m.medida}
                                                    onChange={e => actualizarMedida(m.id, "medida", e.target.value)} />
                                            </td>
                                            <td>
                                                <textarea className="gd-cell-textarea" value={m.beneficiario}
                                                    onChange={e => actualizarMedida(m.id, "beneficiario", e.target.value)} />
                                            </td>
                                            <td>
                                                <textarea className="gd-cell-textarea" value={m.institucion}
                                                    onChange={e => actualizarMedida(m.id, "institucion", e.target.value)} />
                                            </td>
                                            <td>
                                                <textarea className="gd-cell-textarea" value={m.periodicidad}
                                                    onChange={e => actualizarMedida(m.id, "periodicidad", e.target.value)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Seccion>

                {/* ─────────────────────────────────
                    SECCIÓN 6: Marco jurídico
                ───────────────────────────────── */}
                <Seccion numero="6" titulo="Marco Jurídico" abierto={abiertos.s6} onToggle={() => toggle("s6")}>
                    <p className="gd-instruccion">
                        Sustento legal de las medidas de protección especial propuestas.
                    </p>
                    <textarea
                        className="gd-textarea gd-textarea--md"
                        placeholder="Describa el marco jurídico que sustenta las medidas propuestas (leyes, artículos, normativas)..."
                        value={doc.marcoJuridico}
                        onChange={e => set("marcoJuridico", e.target.value)}
                    />
                </Seccion>

                {/* ─────────────────────────────────
                    SECCIÓN 7: Seguimiento
                ───────────────────────────────── */}
                <Seccion numero="7" titulo="Seguimiento y Evaluación de las Medidas de Protección Especial" abierto={abiertos.s7} onToggle={() => toggle("s7")}>
                    <div className="gd-texto-fijo">
                        Para asegurar que los acuerdos del acta se cumplan de forma cabal, el equipo multidisciplinario de casos de la Procuraduría de Protección se encargará de dar seguimiento a la ejecución de las medidas de protección especial en él subscritas, verificando de manera regular que se cumplan según los plazos establecidos. El cierre del caso sólo se dará cuando se hayan constatado que todas las medidas de protección se han ejecutado de manera adecuada y han tenido el impacto esperado en la situación de los derechos de NNA.
                    </div>

                    <div className="gd-subseccion">
                        <h4 className="gd-subtitulo">a) Calendarización de la ejecución de medidas de protección especial</h4>
                        <p className="gd-instruccion-sm">
                            Cronograma de trabajo del equipo multidisciplinario: periodos para realizar el seguimiento y vigilar el cumplimiento de las medidas propuestas en el plan.
                        </p>
                        <textarea
                            className="gd-textarea gd-textarea--lg"
                            placeholder="Describa el cronograma y calendarización de seguimiento de las medidas de protección..."
                            value={doc.calendarizacion}
                            onChange={e => set("calendarizacion", e.target.value)}
                        />
                    </div>

                    {/* Bloque de firmas */}
                    <div className="gd-subseccion">
                        <div className="gd-firma-intro">
                            <span>Se firma de común consenso el presente acuerdo en </span>
                            <input
                                className="gd-input-inline"
                                placeholder="lugar"
                                value={doc.lugarFirma}
                                onChange={e => set("lugarFirma", e.target.value)}
                            />
                            <span>, el día </span>
                            <input
                                className="gd-input-inline"
                                placeholder="fecha"
                                value={doc.fechaFirma}
                                onChange={e => set("fechaFirma", e.target.value)}
                            />
                            <span>.</span>
                        </div>

                        <div className="gd-firmas">
                            <div className="gd-firma-bloque">
                                <div className="gd-firma-linea" />
                                <p className="gd-firma-etiqueta">Firmas de las personas adultas de la familia a cargo de la NNA</p>
                            </div>
                            <div className="gd-firma-bloque">
                                <div className="gd-firma-linea" />
                                <p className="gd-firma-etiqueta">Firma de los miembros del Equipo Multidisciplinario de Casos de la Procuraduría de Protección</p>
                            </div>
                            <div className="gd-firma-bloque">
                                <div className="gd-firma-linea" />
                                <p className="gd-firma-etiqueta">Firma de los servidores públicos encargados de la ejecución de las medidas de protección (cuando sea el caso)</p>
                            </div>
                        </div>
                    </div>
                </Seccion>

                {/* Botones finales */}
                <div className="gd-acciones">
                    <button className="gd-btn-atras" onClick={() => navigate("/plan-restitucion/crear-plan")}>
                        ← Atrás
                    </button>
                    <div className="gd-acciones-derecha">
                        <button className="gd-btn-guardar" onClick={guardarDocumento}>
                            Guardar Borrador
                        </button>
                        <button className="gd-btn-imprimir-final" onClick={imprimirDocumento}>
                            🖨 Imprimir / Exportar PDF
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default GenerarDocumento;
