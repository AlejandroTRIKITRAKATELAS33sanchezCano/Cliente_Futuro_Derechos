import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.avif";
import Header from "./components/Header";
import "../styles/VerificacionDerechos.css";

// ============================================================
// DATOS: todos los derechos y preguntas extraídos del PDF
// (Caja de Herramientas, páginas 78-80)
// ============================================================
const DERECHOS = [
    {
        id: "identidad",
        titulo: "1. Derecho a la Identidad",
        subtitulo: "Acta, nombre, filiación, origen, nacionalidad (arts. 19, 20 y 21)",
        preguntas: [
            "¿Está registrado en el registro civil?",
            "¿Cuenta con acta de nacimiento?",
            "¿Se conoce su filiación y origen?",
        ],
    },
    {
        id: "familia",
        titulo: "2. Derecho a Vivir en Familia",
        subtitulo: "(Arts. 22, 23 y 26)",
        preguntas: [
            "¿La niña, niño o adolescente vive con su familia, salvo que la autoridad competente haya determinado lo contrario?",
            "En caso de encontrarse separado de su familia, ¿tiene permitida la convivencia o mantenimiento de relaciones personales con sus familiares? Salvo que la autoridad competente haya determinado lo contrario.",
            "¿Es considerada la opinión de la niña, niño o adolescente en la familia?",
            "¿La niña, niño o adolescente es escuchado y tomado en cuenta en los asuntos de su interés?",
            "¿La niña, niño o adolescente ha sido separado de algún miembro de su familia?",
        ],
    },
    {
        id: "discriminacion",
        titulo: "3. Derecho a No Ser Discriminado",
        subtitulo: "(Art. 39)",
        preguntas: [
            "¿La niña, niño o adolescente goza de su derecho a no ser discriminado? (No existen signos de haber sufrido discriminación en razón de su origen étnico, nacional o social, idioma, edad, género, preferencia sexual, estado civil, religión, opinión, condición económica, discapacidad u otras condiciones.)",
        ],
    },
    {
        id: "bienestar",
        titulo: "4. Derecho a Vivir en Condiciones de Bienestar y a un Sano Desarrollo Integral",
        subtitulo: "(Art. 43)",
        preguntas: [
            "¿La niña, niño o adolescente vive en una vivienda adecuada para su desarrollo?",
            "¿La niña, niño o adolescente vive en un medio ambiente sano adecuado para su desarrollo y bienestar?",
            "¿La niña, niño o adolescente cuenta con la protección y supervisión adecuadas por parte de un adulto responsable de su cuidado?",
        ],
    },
    {
        id: "violencia",
        titulo: "5. Derecho a una Vida Libre de Violencia y a la Integridad Personal",
        subtitulo: "(Arts. 46, 47, 48 y 49)",
        preguntas: [
            "¿La niña, niño o adolescente disfruta de una vida libre de violencia? (Se entiende por violencia: negligencia, descuido, abandono, corrupción de menores, trata de personas, tráfico de menores, abuso físico, psicológico o sexual, explotación sexual o laboral, incitación o coacción para la comisión de delitos.)",
            "¿La niña, niño o adolescente vive en un ambiente donde pueda desarrollarse de una manera integral?",
            "¿La niña, niño o adolescente no ha presenciado o no ha sido víctima de violencia física, verbal o psicológica? (No muestra signos de sufrir violencia.)",
        ],
    },
    {
        id: "salud",
        titulo: "6. Derecho a la Protección de la Salud y a la Seguridad Social",
        subtitulo: "(Arts. 50 y 51)",
        preguntas: [
            "¿La niña, niño o adolescente muestra una nutrición adecuada? (No existen signos de desnutrición.)",
            "¿La niña, niño o adolescente tiene la talla y peso adecuado a su edad?",
            "¿La niña, niño o adolescente asiste a revisión médica periódica?",
            "¿La niña, niño o adolescente cuenta con cartilla de vacunación?",
            "¿La cartilla de vacunación se encuentra completa?",
            "En caso de que se le haya detectado alguna enfermedad, ¿se le brinda el tratamiento adecuado?",
            "¿La niña, niño o adolescente cuenta con servicio médico de seguro social o seguro popular?",
        ],
    },
    {
        id: "discapacidad",
        titulo: "7. Derecho a la Inclusión de Niñas, Niños y Adolescentes con Discapacidad",
        subtitulo: "(Arts. 53 y 54)",
        preguntas: [
            "En caso de vivir con alguna discapacidad y requerir algún aditamento como silla de ruedas, ¿cuenta con él?",
            "En caso de vivir con alguna discapacidad y requerir atención médica, ¿la recibe?",
        ],
    },
    {
        id: "educacion",
        titulo: "8. Derecho a la Educación",
        subtitulo: "(Art. 57)",
        preguntas: [
            "¿La niña, niño o adolescente se encuentra inscrito a la escuela?",
            "¿La niña, niño o adolescente asiste regularmente a la escuela?",
            "¿Se da algún seguimiento a su desempeño escolar?",
        ],
    },
    {
        id: "descanso",
        titulo: "9. Derecho al Descanso y al Esparcimiento",
        subtitulo: "(Arts. 60 y 61)",
        preguntas: [
            "¿La niña, niño o adolescente duerme las horas adecuadas a su edad?",
            "¿La niña, niño o adolescente realiza actividades de esparcimiento o juego regularmente conforme a su edad?",
            "¿La niña, niño o adolescente realiza actividades culturales, deportivas o artísticas?",
            "¿A la niña, niño o adolescente se le permite reunirse con otras NNA para jugar o platicar?",
        ],
    },
    {
        id: "intimidad",
        titulo: "10. Derecho a la Intimidad",
        subtitulo: "(Art. 76)",
        preguntas: [
            "¿La niña, niño o adolescente goza de su derecho a la intimidad? (No ha sido objeto de injerencias arbitrarias o ilegales en su vida privada, su familia, su domicilio o su correspondencia; no ha sufrido divulgaciones o difusiones ilícitas de información o datos personales que atenten contra su honra, imagen o reputación.)",
            "¿El derecho de la NNA a que no se divulguen datos personales sin su consentimiento ha sido salvaguardado?",
        ],
    },
    {
        id: "migrantes",
        titulo: "11. Derechos de Niñas, Niños y Adolescentes Migrantes",
        subtitulo: "(Arts. 89, 90, 91 y 92)",
        preguntas: [
            "¿La niña, niño o adolescente migrante goza de sus derechos vinculados con la migración? (No está siendo discriminado por su origen, nacionalidad o estatus migratorio, ni está en régimen de privación de libertad por dicho estatus; cuenta con asistencia consular en caso de ser extranjero y goza de todos los demás derechos del capítulo 19 de la LGDNNA.)",
        ],
    },
    {
        id: "otras",
        titulo: "12. Otras Observaciones sobre la Garantía de Derechos",
        subtitulo: "",
        preguntas: [
            "Registre cualquier observación adicional relevante sobre la garantía de derechos de la NNA.",
        ],
    },
];

// Opciones para cada pregunta
const OPCIONES = ["Sí", "No", "No Aplica"];

function construirEstadoInicial() {
    const estado = {};
    DERECHOS.forEach((derecho) => {
        estado[derecho.id] = derecho.preguntas.map(() => null);
    });
    return estado;
}

function VerificacionDerechos() {
    const navigate = useNavigate();
    const [respuestas, setRespuestas] = useState(construirEstadoInicial);
    const [abiertos, setAbiertos] = useState(
        DERECHOS.reduce((acc, d) => ({ ...acc, [d.id]: true }), {})
    );

    // Datos del caso (en producción vendrán del contexto/API)
    const infoCaso = {
        nombre: "María García López",
        folio: "CASO-2026-001",
        estado: "Evaluación Diagnóstica",
    };

    const toggleSeccion = (id) => {
        setAbiertos((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const seleccionar = (derechoId, preguntaIdx, opcion) => {
        setRespuestas((prev) => {
            const copia = [...prev[derechoId]];
            copia[preguntaIdx] = opcion;
            return { ...prev, [derechoId]: copia };
        });
    };

    const totalPreguntas = DERECHOS.reduce((acc, d) => acc + d.preguntas.length, 0);
    const respondidas = Object.values(respuestas).reduce(
        (acc, arr) => acc + arr.filter((v) => v !== null).length,
        0
    );
    const progreso = Math.round((respondidas / totalPreguntas) * 100);

    const todasRespondidas = respondidas === totalPreguntas;

    const guardarBorrador = () => {
        sessionStorage.setItem("verificacionDerechos", JSON.stringify(respuestas));
        alert("Borrador guardado correctamente.");
    };

    const crearPlan = () => {
        if (!todasRespondidas) {
            alert("Por favor complete todas las preguntas antes de continuar.");
            return;
        }
        sessionStorage.setItem("verificacionDerechos", JSON.stringify(respuestas));
        navigate("/plan-restitucion/crear-plan");
    };

    return (
        <div className="ver-page">
            <Header />

            <main className="ver-main">
                {/* Tarjeta de información del caso */}
                <div className="ver-info-caso">
                    <div className="ver-info-campo">
                        <span className="ver-info-label">Nombre del NNA</span>
                        <span className="ver-info-valor">{infoCaso.nombre}</span>
                    </div>
                    <div className="ver-info-campo">
                        <span className="ver-info-label">Folio del Caso</span>
                        <span className="ver-info-valor">{infoCaso.folio}</span>
                    </div>
                    <div className="ver-info-campo">
                        <span className="ver-info-label">Estado Actual</span>
                        <span className="ver-info-badge">{infoCaso.estado}</span>
                    </div>
                </div>

                {/* Encabezado del módulo */}
                <div className="ver-modulo-header">
                    <h2 className="ver-modulo-titulo">Módulo de Verificación de Derechos</h2>
                    <p className="ver-modulo-desc">
                        Complete la evaluación de cada derecho. Los derechos marcados como "No" se considerarán
                        vulnerados y serán incluidos en el plan de restitución.
                    </p>

                    {/* Barra de progreso */}
                    <div className="ver-progreso-contenedor">
                        <div className="ver-progreso-texto">
                            <span>{respondidas} de {totalPreguntas} preguntas respondidas</span>
                            <span>{progreso}%</span>
                        </div>
                        <div className="ver-progreso-barra">
                            <div
                                className="ver-progreso-relleno"
                                style={{ width: `${progreso}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Secciones de derechos */}
                <div className="ver-secciones">
                    {DERECHOS.map((derecho) => {
                        const abierto = abiertos[derecho.id];
                        const respDerechoArr = respuestas[derecho.id];
                        const vulneradas = respDerechoArr.filter((v) => v === "No").length;

                        return (
                            <div key={derecho.id} className="ver-seccion">
                                {/* Cabecera de sección */}
                                <div
                                    className={`ver-seccion-header ${vulneradas > 0 ? "ver-seccion-header--alerta" : ""}`}
                                    onClick={() => toggleSeccion(derecho.id)}
                                >
                                    <div className="ver-seccion-titulo-grupo">
                                        <span className="ver-seccion-titulo">{derecho.titulo}</span>
                                        {derecho.subtitulo && (
                                            <span className="ver-seccion-subtitulo">{derecho.subtitulo}</span>
                                        )}
                                    </div>
                                    <div className="ver-seccion-controles">
                                        {vulneradas > 0 && (
                                            <span className="ver-badge-vulnerado">
                                                {vulneradas} vulnerado{vulneradas > 1 ? "s" : ""}
                                            </span>
                                        )}
                                        <span className="ver-chevron">{abierto ? "∧" : "∨"}</span>
                                    </div>
                                </div>

                                {/* Preguntas */}
                                {abierto && (
                                    <div className="ver-preguntas">
                                        {derecho.preguntas.map((pregunta, idx) => {
                                            const valor = respDerechoArr[idx];
                                            return (
                                                <div
                                                    key={idx}
                                                    className={`ver-pregunta-fila ${valor === "No" ? "ver-pregunta-fila--vulnerada" : ""}`}
                                                >
                                                    <p className="ver-pregunta-texto">{pregunta}</p>
                                                    <div className="ver-opciones">
                                                        {OPCIONES.map((opcion) => (
                                                            <button
                                                                key={opcion}
                                                                className={`ver-btn-opcion ${valor === opcion ? `ver-btn-opcion--activo ver-btn-opcion--${opcion.toLowerCase().replace(" ", "-")}` : ""}`}
                                                                onClick={() => seleccionar(derecho.id, idx, opcion)}
                                                            >
                                                                {opcion}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Botones de acción */}
                <div className="ver-acciones">
                    <button
                        className="ver-btn-atras"
                        onClick={() => navigate("/plan-restitucion/cuestionario")}
                    >
                        Atrás
                    </button>

                    <div className="ver-acciones-derecha">
                        <button className="ver-btn-borrador" onClick={guardarBorrador}>
                            Guardar Borrador
                        </button>
                        <button
                            className={`ver-btn-siguiente ${!todasRespondidas ? "ver-btn-siguiente--deshabilitado" : ""}`}
                            onClick={crearPlan}
                        >
                            Siguiente: Crear Plan →
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default VerificacionDerechos;
