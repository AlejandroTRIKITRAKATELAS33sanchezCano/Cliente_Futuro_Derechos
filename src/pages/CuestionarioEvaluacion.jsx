import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.avif";
import "../styles/CuestionarioEvaluacion.css";

const REGLAS = [
    {
        id: 1,
        encabezado: "Al atender este derecho el servidor público, identifica el acceso de la NNA a:",
        pregunta: "¿Qué identifica el servidor público en el derecho de la persona NNA?",
    },
    {
        id: 2,
        encabezado: "Conocer qué significa en la práctica garantizar este derecho para la NNA. Principales contenidos:",
        pregunta: "¿Qué debe saber el servidor público sobre el derecho de la NNA?",
    },
    {
        id: 3,
        encabezado: "Se interroga a la NNA con preguntas que ayudan a identificar el ejercicio de este derecho, de acuerdo con su capacidad evolutiva, como por ejemplo:",
        pregunta: "¿Qué preguntas puede hacer el servidor público a la persona NNA para identificar el ejercicio de su derecho?",
    },
    {
        id: 4,
        encabezado: "Se interroga a la persona adulta encargada del cuidado de la NNA con preguntas como por ejemplo:",
        pregunta: "¿Qué preguntas puede realizar el servidor público a la persona adulta encargada del cuidado de la NNA para identificar el ejercicio de este derecho?",
    },
    {
        id: 5,
        encabezado: "Observar en el entorno y contexto de la NNA, por ejemplo:",
        pregunta: "¿Qué observa el servidor público en el entorno y contexto de la NNA?",
    },
    {
        id: 6,
        encabezado: "Al garantizar este derecho, el servidor público toma en cuenta los siguientes puntos:",
        pregunta: "¿Qué cuestiones toma en cuenta el servidor público para garantizar el derecho de la NNA?",
    },
];

function CuestionarioEvaluacion() {
    const navigate = useNavigate();
    const [respuestas, setRespuestas] = useState(
        REGLAS.reduce((acc, r) => ({ ...acc, [r.id]: "" }), {})
    );

    const manejarCambio = (id, valor) => {
        setRespuestas((prev) => ({ ...prev, [id]: valor }));
    };

    const continuar = () => {
        // Guardamos las respuestas en sessionStorage para que la siguiente pantalla las tenga disponibles
        sessionStorage.setItem("cuestionarioISN", JSON.stringify(respuestas));
        navigate("/plan-restitucion/verificacion");
    };

    return (
        <div className="cue-page">
            {/* Header institucional */}
            <header className="cue-header">
                <div className="cue-header-logo">
                    <img src={logo} alt="Futuro con Derechos" />
                </div>
                <div className="cue-header-escudo">
                    <div className="cue-escudo-placeholder">
                        <span>NUEVO LEÓN</span>
                        <small>GOBIERNO DEL ESTADO</small>
                    </div>
                </div>
            </header>

            <main className="cue-main">
                <h1 className="cue-titulo">Cuestionario de Evaluación de Derechos</h1>

                {/* Tabla de 6 columnas */}
                <div className="cue-tabla-wrapper">
                    <div className="cue-tabla">
                        {/* Fila de encabezados */}
                        <div className="cue-tabla-encabezados">
                            {REGLAS.map((regla) => (
                                <div key={regla.id} className="cue-encabezado-celda">
                                    {regla.encabezado}
                                </div>
                            ))}
                        </div>

                        {/* Fila de preguntas y textareas */}
                        <div className="cue-tabla-cuerpo">
                            {REGLAS.map((regla) => (
                                <div key={regla.id} className="cue-cuerpo-celda">
                                    <p className="cue-regla-titulo">Regla {regla.id}</p>
                                    <p className="cue-regla-pregunta">{regla.pregunta}</p>
                                    <textarea
                                        className="cue-textarea"
                                        placeholder="Escriba su respuesta aquí..."
                                        value={respuestas[regla.id]}
                                        onChange={(e) => manejarCambio(regla.id, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Botón continuar */}
                <div className="cue-footer">
                    <button className="cue-btn-continuar" onClick={continuar}>
                        Continuar a Verificación de Derechos →
                    </button>
                </div>
            </main>
        </div>
    );
}

export default CuestionarioEvaluacion;
