import { useState, useEffect } from "react"
import Header from "./components/Header"
import "../styles/registrarEmpleado.css"
import { useFormik } from 'formik'
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom"; //

const generarPassword = (longitud = 12) => {
    const caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

    let password = "";
    for (let i = 0; i < longitud; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        password += caracteres[randomIndex];
    }

    return password;
};

const valoresIniciales = {
    nombre: '',
    primerApellido: '',
    segundoApellido: '',
    fechaNacimiento: '',
    sexo: '',
    rfc: '',
    curp: '',
    empleadoVoluntario: '',
    rolId: '',
    email: '',
    codigoPostal: '',
    estadoNombre: '',
    estadoClave: '',
    municipioNombre: '',
    coloniaNombre: '',
    calle: '',
    sn: '',
    numExterior: '',
    numInterior: '',
    referencia: ''
}


const validacion = values => {
    let errors = {}

    if (!values.nombre) errors.nombre = 'Este campo es obligatorio';
    if (!values.primerApellido) errors.primerApellido = 'Este campo es obligatorio';
    if (!values.segundoApellido) errors.segundoApellido = 'Este campo es obligatorio';
    if (!values.fechaNacimiento){
        errors.fechaNacimiento = 'Este campo es obligatorio';
    } else{
        const fechaNac = new Date(values.fechaNacimiento);
        const hoy = new Date();
        
        // Calculamos la edad
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth();
        
        // Ajuste si aún no ha pasado su cumpleaños este año
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }

        // Validación de minoría de edad
        if (edad < 18) {
            errors.fechaNacimiento = 'Debes ser mayor de edad para registrarte.';
        }
    }
    if (!values.sexo) errors.sexo = 'Seleccione una opción';

    // RFC
    if (!values.rfc) {
        errors.rfc = 'Este campo es obligatorio';
    } else if (!/^[A-Z&Ñ]{3,4}[0-9]{6}[A-Z0-9]{3}$/i.test(values.rfc)) {
        errors.rfc = 'Formato de RFC inválido';
    }

    // CURP
    if (!values.curp) {
        errors.curp = 'Este campo es obligatorio';
    } else if (!/^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[A-Z0-9]{2}$/i.test(values.curp)) {
        errors.curp = 'Formato de CURP inválido';
    }

    if (!values.empleadoVoluntario) errors.empleadoVoluntario = 'Seleccione una opción';

    // Rol
    if (!values.rolId) errors.rolId = 'Seleccione una opción';

    // Email
    if (!values.email) {
        errors.email = 'Este campo es obligatorio';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Formato de correo no valido';
    }

    // Código Postal 
    if (!values.codigoPostal) {
        errors.codigoPostal = 'Este campo es obligatorio';
    } else if (!/^[0-9]{5}$/.test(values.codigoPostal)) {
        errors.codigoPostal = 'Formato de codigo postal no valido';
    }

    if (!values.coloniaNombre) errors.coloniaNombre = 'Seleccione una opción';
    if (!values.calle) errors.calle = 'Este campo es obligatorio';

    // sn
    if (!values.sn) {
        errors.sn = 'Seleccione una opción';
    }

    if (values.sn === 'si') {
        if (!values.numExterior) {
            errors.numExterior = 'Este campo es obligatorio';
        }
        if (!values.numInterior) {
            errors.numInterior = 'Este campo es obligatorio';
        }
    }

    return errors
}


function RegistrarEmpleado() {
    const navigate = useNavigate();

    const onSubmit = async (values) => {

        const payload = {
            ...values,
            numExterior: values.numExterior === "" ? null : Number(values.numExterior),
            numInterior: values.numInterior === "" ? null : Number(values.numInterior),
            estadoClave: values.estadoClave,
            municipioClave: values.municipioClave,
            rolId: Number(values.rolId),
            empleadoVoluntario: values.empleadoVoluntario === "Empleado" ? 1 : 0,
            activo: 1,
            password: generarPassword(12),
            urlIMG: "https://res.cloudinary.com/dbb56iwkk/image/upload/t_media_lib_thumb/cld-sample.jpg"
        }

        try {
            const response = await axiosInstance.post("/usuarios/crearUsuario", payload);

            console.log("Usuario creado:", response.data);
            alert("Usuario registrado correctamente");

            navigate("/administrador/consultarEmpleados");

        } catch (error) {
            console.error("Error:", error)
            const mensajeError = error.response?.data?.message || "Error al registrar";
            alert(mensajeError);
        }
    }

    const formik = useFormik({
        initialValues: valoresIniciales,
        onSubmit: onSubmit,
        validate: validacion
    });

    console.log('Form values', formik.values)

    const [colonias, setColonias] = useState([])
    const [estadoClave, setEstadoClave] = useState('')
    const [municipioClave, setMunicipioClave] = useState('')
    const [direccionBloqueada, setDireccionBloqueada] = useState(false)
    const [roles, setRoles] = useState([])

    useEffect(() => {
            const obtenerRoles = async () => {
                try {
                    const response = await fetch("http://localhost:3000/api/roles")
                    const data = await response.json()
    
                    setRoles(data) // suponiendo que devuelve un array
                } catch (error) {
                    console.error("Error obteniendo roles:", error)
                }
            }
    
            obtenerRoles()
        }, [])

    useEffect(() => {
        const cp = formik.values.codigoPostal

        if (cp && cp.length === 5) {
            fetch(`http://localhost:3000/api/cp/${cp}`)
                .then(res => res.json())
                .then(data => {

                    setColonias(data.colonias)

                    setEstadoClave(data.estadoClave)
                    setMunicipioClave(data.municipioClave)

                    formik.setFieldValue("estadoNombre", data.estadoNombre)
                    formik.setFieldValue("municipioNombre", data.municipioNombre)

                    setDireccionBloqueada(true)
                })
                .catch(err => console.error(err))
        }
    }, [formik.values.codigoPostal])

    const [imagen, setImagen] = useState(null)

    const manejarImagen = (e) => {
        const archivo = e.target.files[0]

        if (archivo) {
            const urlTemporal = URL.createObjectURL(archivo)
            setImagen(urlTemporal)
        }
    }

    return (
        <>
            <Header />
            <h2 className="titulo">Registro de Empleado</h2>
            <section className="registro">

                <div className="formulario-contenedor">

                    <form className="formulario" onSubmit={formik.handleSubmit}>
                        <div className="campo-grupo">
                            <label htmlFor="nombre"> Nombre </label>
                            <input type="text" id="nombre" name="nombre" placeholder="Aqui va tu nombre" onChange={formik.handleChange} value={formik.values.nombre} />
                            {formik.errors.nombre ? (<div className="error">{formik.errors.nombre}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="primerApellido"> Primer apellido </label>
                            <input type="text" id="primerApellido" name="primerApellido" placeholder="Aqui va tu primer apellido" onChange={formik.handleChange} value={formik.values.primerApellido} />
                            {formik.errors.primerApellido ? (<div className="error">{formik.errors.primerApellido}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="segundoApellido"> Segundo apellido </label>
                            <input type="text" id="segundoApellido" name="segundoApellido" placeholder="Aqui va tu segundo apellido" onChange={formik.handleChange} value={formik.values.segundoApellido} />
                            {formik.errors.segundoApellido ? (<div className="error">{formik.errors.segundoApellido}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="fechaNacimiento">Ingresa tu fecha de nacimiento</label>
                            <input type="date" id="fechaNacimiento" name="fechaNacimiento" onChange={formik.handleChange} value={formik.values.fechaNacimiento} />
                            {formik.errors.fechaNacimiento ? (<div className="error">{formik.errors.fechaNacimiento}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label> Selecciona el sexo </label>
                            <select defaultValue="" id="sexo" name="sexo" onChange={formik.handleChange} value={formik.values.sexo}>
                                <option value="" disabled>Seleccionar sexo</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                                <option value="O">Otro</option>
                            </select>
                            {formik.errors.sexo ? (<div className="error">{formik.errors.sexo}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="rfc"> Ingresa el RFC </label>
                            <input type="text" placeholder="Ej: MOGF780404S36" id="rfc" name="rfc" onChange={formik.handleChange} value={formik.values.rfc} />
                            {formik.errors.rfc ? (<div className="error">{formik.errors.rfc}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="curp"> Ingresa la CURP </label>
                            <input type="text" placeholder="Ej: PEGJ900314HDFMRN00" id="curp" name="curp" onChange={formik.handleChange} value={formik.values.curp} />
                            {formik.errors.curp ? (<div className="error">{formik.errors.curp}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="empleadoVoluntario"> Voluntario o empleado </label>
                            <select defaultValue="" id="empleadoVoluntario" name="empleadoVoluntario" onChange={formik.handleChange} value={formik.values.empleadoVoluntario}>
                                <option value="" disabled>Selecciona tipo de ayudante</option>
                                <option value="Voluntario">Voluntario</option>
                                <option value="Empleado">Empleado</option>
                            </select>
                            {formik.errors.empleadoVoluntario ? (<div className="error">{formik.errors.empleadoVoluntario}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label> Elección de rol </label>
                            <select
                                id="rolId"
                                name="rolId"
                                onChange={formik.handleChange}
                                value={formik.values.rolId}
                            >
                                <option value="" disabled>Seleccionar rol</option>

                                {roles.map((rol) => (
                                    <option key={rol.idrol} value={rol.idrol}>
                                        {rol.rolnombre}
                                    </option>
                                ))}
                            </select>
                            {formik.errors.rolId ? (<div className="error">{formik.errors.rolId}</div>):null}
                        </div>


                        <div className="campo-grupo">
                            <label htmlFor="correo"> Ingresa el correo </label>
                            <input type="email" placeholder="Correo" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
                            {formik.errors.email ? (<div className="error">{formik.errors.email}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="codigoPostal"> Ingrese su código postal </label>
                            <input type="text" maxLength={5} placeholder="Codigo Postal" id="codigoPostal" name="codigoPostal" onChange={formik.handleChange} value={formik.values.codigoPostal} />
                            {formik.errors.codigoPostal ? (<div className="error">{formik.errors.codigoPostal}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <select
                                name="estadoNombre"
                                disabled
                                onChange={formik.handleChange}
                                value={formik.values.estadoNombre}
                            >
                                <option value="">Estado</option>
                                <option value={formik.values.estadoNombre}>
                                    {formik.values.estadoNombre}
                                </option>
                            </select>
                        </div>

                        <div className="campo-grupo">
                            <select
                                name="municipioNombre"
                                disabled
                                onChange={formik.handleChange}
                                value={formik.values.municipioNombre}
                            >
                                <option value="">
                                    Municipio
                                </option>
                                <option value={formik.values.municipioNombre}>
                                    {formik.values.municipioNombre}
                                </option>
                            </select>
                        </div>

                        <div className="campo-grupo">
                            <select
                                name="coloniaNombre"
                                onChange={formik.handleChange}
                                value={formik.values.coloniaNombre}
                            >
                                <option value="">Selecciona colonia</option>
                                {colonias.map((col, index) => (
                                    <option key={index} value={col}>
                                        {col}
                                    </option>
                                ))}
                            </select>
                            {formik.errors.coloniaNombre ? (<div className="error">{formik.errors.coloniaNombre}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="calle"> Ingresa la calle </label>
                            <input type="text" placeholder="Ej: Cerro Colmena" id="calle" name="calle" onChange={formik.handleChange} value={formik.values.calle} />
                            {formik.errors.calle ? (<div className="error">{formik.errors.calle}</div>):null}
                        </div>

                        <div className="campo-grupo radio-columna">
                            <label>¿Tiene numero interior o exterior?</label>
                            <div className="radio-opciones">
                                <div className="opcion-item">
                                    <input type="radio" id="si" name="sn" onChange={formik.handleChange} value="si" checked={formik.values.sn === "si"}/>
                                    <label htmlFor="si">Sí</label>
                                </div>
                                <div className="opcion-item">
                                    <input type="radio" id="no" name="sn" onChange={formik.handleChange} value="no" checked={formik.values.sn === "no"} />
                                    <label htmlFor="no">No</label>
                                </div>
                            </div>
                            {formik.errors.sn ? (<div className="error">{formik.errors.sn}</div>) : null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="numExterior"> Ingrese su numero exterior </label>
                            <input type="number" placeholder="Ej: 35" id="numExterior" name="numExterior" onChange={formik.handleChange} value={formik.values.numExterior} disabled={formik.values.sn === "no"} />
                            {formik.errors.numExterior ? (<div className="error">{formik.errors.numExterior}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="numInterior"> Ingrese su numero interior </label>
                            <input type="number" placeholder="Ej: 40" id="numInterior" name="numInterior" onChange={formik.handleChange} value={formik.values.numInterior} disabled={formik.values.sn === "no"}/>
                            {formik.errors.numInterior ? (<div className="error">{formik.errors.numInterior}</div>):null}
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="referencia"> Ingresa una referencia </label>
                        </div>
                        <input type="text" className="direccion" placeholder="Opcional" id="referencia" name="referencia" onChange={formik.handleChange} value={formik.values.referencia}/>

                        <button type="submit" className="btn-registrar" disabled={!formik.isValid || formik.isSubmitting}>
                            {formik.isSubmitting ? "Registrando..." : "Registrar"}
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default RegistrarEmpleado

