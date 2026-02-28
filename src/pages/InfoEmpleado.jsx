import { useState, useEffect } from "react";
// Importamos useParams suponiendo que usas react-router-dom para obtener el ID de la URL
import { useParams, useNavigate } from "react-router-dom"; 
import Header from "./components/Header";
import "../styles/infoEmpleado.css"; // Archivo CSS actualizado
import { useFormik } from 'formik';

const valoresIniciales = {
    nombre: '', primerApellido: '', segundoApellido: '', fechaNacimiento: '',
    sexo: '', rfc: '', curp: '', empleadoVoluntario: '', rolid: '', email: '',
    codigoPostal: '', estadoNombre: '', estadoClave: '', municipioNombre: '',
    coloniaNombre: '', calle: '', sn: '', numExterior: '', numInterior: '', referencia: ''
};

// Reutilizamos tu misma validación
const validacion = values => {
    let errors = {};
    if (!values.nombre) errors.nombre = 'Este campo es obligatorio';
    if (!values.primerApellido) errors.primerApellido = 'Este campo es obligatorio';
    if (!values.segundoApellido) errors.segundoApellido = 'Este campo es obligatorio';
    if (!values.fechaNacimiento) errors.fechaNacimiento = 'Este campo es obligatorio';
    if (!values.sexo) errors.sexo = 'Seleccione una opción';
    if (!values.rfc) errors.rfc = 'Este campo es obligatorio';
    else if (!/^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$/i.test(values.rfc)) errors.rfc = 'Formato de RFC inválido';
    if (!values.curp) errors.curp = 'Este campo es obligatorio';
    else if (!/^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[A-Z0-9]{2}$/i.test(values.curp)) errors.curp = 'Formato de CURP inválido';
    if (!values.empleadoVoluntario) errors.empleadoVoluntario = 'Seleccione una opción';
    if (!values.rolid) errors.rolid = 'Seleccione una opción';
    if (!values.email) errors.email = 'Este campo es obligatorio';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Formato de correo no valido';
    if (!values.codigoPostal) errors.codigoPostal = 'Este campo es obligatorio';
    else if (!/^[0-9]{5}$/.test(values.codigoPostal)) errors.codigoPostal = 'Formato de codigo postal no valido';
    if (!values.coloniaNombre) errors.coloniaNombre = 'Seleccione una opción';
    if (!values.calle) errors.calle = 'Este campo es obligatorio';
    if (!values.sn) errors.sn = 'Seleccione una opción';
    if (values.sn === 'si') {
        if (!values.numExterior) errors.numExterior = 'Este campo es obligatorio';
        if (!values.numInterior) errors.numInterior = 'Este campo es obligatorio';
    }
    return errors;
};

function InfoEmpleado() {
    const { id } = useParams(); // Obtenemos el ID del empleado de la URL
    const navigate = useNavigate();

    // Estados para la vista y controles
    const [isEditing, setIsEditing] = useState(false);
    const [empleadoActivo, setEmpleadoActivo] = useState(true); // Para saber si está de alta o baja
    
    // Estados para selectores
    const [colonias, setColonias] = useState([]);
    const [estadoClave, setEstadoClave] = useState('');
    const [municipioClave, setMunicipioClave] = useState('');
    const [roles, setRoles] = useState([]);

    const onSubmit = async (values) => {
        const payload = {
            ...values,
            numExterior: values.numExterior === "" ? null : Number(values.numExterior),
            numInterior: values.numInterior === "" ? null : Number(values.numInterior),
            estadoClave: estadoClave,
            municipioClave: municipioClave,
            rolId: Number(values.rolid),
            empleadoVoluntario: values.empleadoVoluntario === "Empleado" ? 1 : 0
        };

        try {
            // Aquí usamos PUT o PATCH para actualizar
            const response = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            alert("Usuario actualizado correctamente");
            setIsEditing(false); // Bloqueamos el formulario tras guardar
        } catch (error) {
            console.error("Error:", error);
            alert("Error al actualizar");
        }
    };

    const formik = useFormik({
        initialValues: valoresIniciales,
        onSubmit: onSubmit,
        validate: validacion
    });

    // 1. Cargar roles y datos del empleado al montar el componente
    useEffect(() => {
        const cargarDatosInit = async () => {
            try {
                // Cargar roles
                const resRoles = await fetch("http://localhost:3000/api/roles");
                const dataRoles = await resRoles.json();
                setRoles(dataRoles);

                // Cargar datos del empleado (Simula la ruta de tu API)
                if(id) {
                    const resEmpleado = await fetch(`http://localhost:3000/api/usuarios/${id}`);
                    const dataEmpleado = await resEmpleado.json();

                    formik.setValues(dataEmpleado);

                    setEmpleadoActivo(dataEmpleado.usuactivo === 1);
                }
            } catch (error) {
                console.error("Error cargando datos iniciales:", error);
            }
        };
        cargarDatosInit();
    }, [id]);

    // 2. Cargar colonias cuando cambie el código postal
    useEffect(() => {
        const cp = formik.values.codigoPostal;
        if (cp && cp.length === 5) {
            fetch(`http://localhost:3000/api/cp/${cp}`)
                .then(res => res.json())
                .then(data => {
                    setColonias(data.colonias);
                    setEstadoClave(data.estadoClave);
                    setMunicipioClave(data.municipioClave);
                    formik.setFieldValue("estadoNombre", data.estadoNombre);
                    formik.setFieldValue("municipioNombre", data.municipioNombre);
                })
                .catch(err => console.error(err));
        }
    }, [formik.values.codigoPostal]);

    // Handlers para los nuevos botones
    const handleAltaBaja = async () => {
        const confirmar = window.confirm(`¿Estás seguro de dar de ${empleadoActivo ? 'baja' : 'alta'} a este usuario?`);
        if(!confirmar) return;

        try {
            const nuevoEstado = empleadoActivo ? 0 : 1;
            await fetch(`http://localhost:3000/api/usuarios/${id}/estado`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ activo: nuevoEstado })
            });
            setEmpleadoActivo(!empleadoActivo);
            alert(`Usuario dado de ${empleadoActivo ? 'baja' : 'alta'} correctamente.`);
        } catch (error) {
            console.error("Error cambiando estado:", error);
        }
    };

    const handleEliminar = async () => {
    const confirmar = window.confirm("¿Estás seguro de que quieres ELIMINAR permanentemente este usuario?");
    if(!confirmar) return;

    try {
        await fetch(`http://localhost:3000/api/usuarios/${id}`, { method: "DELETE" });
        alert("Usuario eliminado correctamente.");
        
        // 👇 AQUÍ: Redirigimos a la ruta exacta de tu tabla
        navigate("/administrador/consultarEmpleados"); 
        
    } catch (error) {
        console.error("Error eliminando:", error);
    }
};

    return (
        <>
            <Header />
            <h2 className="titulo">Información del Empleado</h2>
            <section className="registro">
                <div className="formulario-contenedor">
                    {/* El form ahora toma el 100% porque quitamos la foto */}
                    <form className="formulario" onSubmit={formik.handleSubmit}>
                        
                        {/* A todos los inputs les agregamos "disabled={!isEditing}" */}
                        <div className="campo-grupo">
                            <label htmlFor="nombre"> Nombre </label>
                            <input type="text" id="nombre" name="nombre" disabled={!isEditing} onChange={formik.handleChange} value={formik.values.nombre || ''} />
                            {formik.errors.nombre ? (<div className="error">{formik.errors.nombre}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="primerApellido"> Primer apellido </label>
                            <input type="text" id="primerApellido" name="primerApellido" disabled={!isEditing} onChange={formik.handleChange} value={formik.values.primerApellido || ''} />
                            {formik.errors.primerApellido ? (<div className="error">{formik.errors.primerApellido}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="segundoApellido"> Segundo apellido </label>
                            <input type="text" id="segundoApellido" name="segundoApellido" disabled={!isEditing} onChange={formik.handleChange} value={formik.values.segundoApellido || ''} />
                            {formik.errors.segundoApellido ? (<div className="error">{formik.errors.segundoApellido}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
                            <input type="date" id="fechaNacimiento" name="fechaNacimiento" disabled={!isEditing} onChange={formik.handleChange} value={formik.values.fechaNacimiento || ''} />
                            {formik.errors.fechaNacimiento ? (<div className="error">{formik.errors.fechaNacimiento}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label> Sexo </label>
                            <select id="sexo" name="sexo" disabled={!isEditing} onChange={formik.handleChange} value={formik.values.sexo || ''}>
                                <option value="" disabled>Seleccionar sexo</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                                <option value="O">Otro</option>
                            </select>
                            {formik.errors.sexo ? (<div className="error">{formik.errors.sexo}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="rfc"> RFC </label>
                            <input type="text" id="rfc" name="rfc" disabled={!isEditing} onChange={formik.handleChange} value={formik.values.rfc || ''} />
                            {formik.errors.rfc ? (<div className="error">{formik.errors.rfc}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="curp"> CURP </label>
                            <input type="text" id="curp" name="curp" disabled={!isEditing} onChange={formik.handleChange} value={formik.values.curp || ''} />
                            {formik.errors.curp ? (<div className="error">{formik.errors.curp}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="empleadoVoluntario"> Voluntario o empleado </label>
                            <select id="empleadoVoluntario" name="empleadoVoluntario" disabled={!isEditing} onChange={formik.handleChange} value={formik.values.empleadoVoluntario || ''}>
                                <option value="" disabled>Selecciona tipo</option>
                                <option value="Voluntario">Voluntario</option>
                                <option value="Empleado">Empleado</option>
                            </select>
                            {formik.errors.empleadoVoluntario ? (<div className="error">{formik.errors.empleadoVoluntario}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label> Elección de rol </label>
                            <select id="rolid" name="rolid" disabled={!isEditing} onChange={formik.handleChange} value={formik.values.rolid || ''}>
                                <option value="" disabled>Seleccionar rol</option>
                                {roles.map((rol) => (
                                    <option key={rol.idrol} value={rol.idrol}>{rol.rolnombre}</option>
                                ))}
                            </select>
                            {formik.errors.rolid ? (<div className="error">{formik.errors.rolid}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="correo"> Correo </label>
                            <input type="email" id="email" name="email" disabled={!isEditing} onChange={formik.handleChange} value={formik.values.email || ''} />
                            {formik.errors.email ? (<div className="error">{formik.errors.email}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="codigoPostal"> Código postal </label>
                            <input type="text" maxLength={5} id="codigoPostal" name="codigoPostal" disabled={!isEditing} onChange={formik.handleChange} value={formik.values.codigoPostal || ''} />
                            {formik.errors.codigoPostal ? (<div className="error">{formik.errors.codigoPostal}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label>Estado</label>
                            <select name="estadoNombre" disabled value={formik.values.estadoNombre || ''}>
                                <option value={formik.values.estadoNombre}>{formik.values.estadoNombre || 'Estado'}</option>
                            </select>
                        </div>

                        <div className="campo-grupo">
                            <label>Municipio</label>
                            <select name="municipioNombre" disabled value={formik.values.municipioNombre || ''}>
                                <option value={formik.values.municipioNombre}>{formik.values.municipioNombre || 'Municipio'}</option>
                            </select>
                        </div>

                        <div className="campo-grupo">
                            <label>Colonia</label>
                            <select name="coloniaNombre" disabled={!isEditing} onChange={formik.handleChange} value={formik.values.coloniaNombre || ''}>
                                <option value="">Selecciona colonia</option>
                                {colonias.map((col, index) => (
                                    <option key={index} value={col}>{col}</option>
                                ))}
                            </select>
                            {formik.errors.coloniaNombre ? (<div className="error">{formik.errors.coloniaNombre}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="calle"> Calle </label>
                            <input type="text" id="calle" name="calle" disabled={!isEditing} onChange={formik.handleChange} value={formik.values.calle || ''} />
                            {formik.errors.calle ? (<div className="error">{formik.errors.calle}</div>):null}
                        </div>

                        <div className="campo-grupo radio-columna">
                            <label>¿Tiene numero interior o exterior?</label>
                            <div className="radio-opciones">
                                <div className="opcion-item">
                                    <input type="radio" id="si" name="sn" disabled={!isEditing} onChange={formik.handleChange} value="si" checked={formik.values.sn === "si"}/>
                                    <label htmlFor="si">Sí</label>
                                </div>
                                <div className="opcion-item">
                                    <input type="radio" id="no" name="sn" disabled={!isEditing} onChange={formik.handleChange} value="no" checked={formik.values.sn === "no"} />
                                    <label htmlFor="no">No</label>
                                </div>
                            </div>
                            {formik.errors.sn ? (<div className="error">{formik.errors.sn}</div>) : null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="numExterior"> Numero exterior </label>
                            <input type="number" id="numExterior" name="numExterior" disabled={!isEditing || formik.values.sn === "no"} onChange={formik.handleChange} value={formik.values.numExterior || ''} />
                            {formik.errors.numExterior ? (<div className="error">{formik.errors.numExterior}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="numInterior"> Numero interior </label>
                            <input type="number" id="numInterior" name="numInterior" disabled={!isEditing || formik.values.sn === "no"} onChange={formik.handleChange} value={formik.values.numInterior || ''}/>
                            {formik.errors.numInterior ? (<div className="error">{formik.errors.numInterior}</div>):null}
                        </div>

                        <div className="campo-grupo direccion">
                            <label htmlFor="referencia"> Referencia (Opcional) </label>
                            <input type="text" id="referencia" name="referencia" disabled={!isEditing} onChange={formik.handleChange} value={formik.values.referencia || ''}/>
                        </div>

                        {/* SECCIÓN DE BOTONES DE ACCIÓN */}
                        <div className="botones-acciones">
                            {isEditing ? (
                                <>
                                    <button type="button" className="btn-cancelar" onClick={() => {
                                        setIsEditing(false);
                                        formik.resetForm(); // Opcional: revierte los cambios al cancelar
                                    }}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn-guardar">
                                        Guardar Cambios
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="btn-modificar" onClick={() => setIsEditing(true)}>
                                        Modificar Datos
                                    </button>
                                    <button type="button" className={empleadoActivo ? "btn-baja" : "btn-alta"} onClick={handleAltaBaja}>
                                        {empleadoActivo ? "Dar de Baja" : "Dar de Alta"}
                                    </button>
                                    <button type="button" className="btn-eliminar" onClick={handleEliminar}>
                                        Eliminar Usuario
                                    </button>
                                </>
                            )}
                        </div>

                    </form>
                </div>
            </section>
        </>
    );
}

export default InfoEmpleado;