import { useState } from "react"
import Header from "./components/Header"
import "../styles/registrarEmpleado.css"
import { useFormik } from 'formik'

function RegistrarEmpleado() {

    const formik = useFormik({
        initialValues: {
            nombre: '',
            primerApellido: '',
            segundoApellido: '',
            fechaNacimiento: '',
            sexo: '',
            rfc: '',
            curp: '',
            empleadoVoluntario: '',
            rolid: '',
            email: '',
            codigoPostal: '',
            estadoNombre: '',
            municipioNombre: '',
            coloniaNombre: '',
            calle: '',
            sn: '',
            numExterior: '',
            numInterior: '',
            referencia: ''
        },
        onSubmit: values => {
            console.log('Form data', values)
        }
    }

    )

    console.log('Form values', formik.values)

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

                    <div className="foto-container">

                        <div className="foto-preview">
                            {imagen ? (
                                <img src={imagen} alt="Preview" />
                            ) : (
                                <span>Foto</span>
                            )}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={manejarImagen}
                        />

                    </div>

                    <form className="formulario" onSubmit={formik.handleSubmit}>
                        <div className="campo-grupo">
                            <label htmlFor="nombre"> Nombre </label>
                            <input type="text" id="nombre" name="nombre" placeholder="Aqui va tu nombre" onChange={formik.handleChange} value={formik.values.nombre}/>
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="primerApellido"> Primer apellido </label>
                            <input type="text" id="primerApellido" name="primerApellido" placeholder="Aqui va tu primer apellido" onChange={formik.handleChange} value={formik.values.primerApellido}/>
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="segundoApellido"> Segundo apellido </label>
                            <input type="text" id="segundoApellido" name="segundoApellido" placeholder="Aqui va tu segundo apellido" onChange={formik.handleChange} value={formik.values.segundoApellido}/>
                        </div>
                        
                        <div className="campo-grupo">
                            <label htmlFor="fechaNacimiento">Ingresa tu fecha de nacimiento</label>
                            <input type="date" id="fechaNacimiento" name="fechaNacimiento" onChange={formik.handleChange} value={formik.values.fechaNacimiento}/>
                        </div>

                        <div className="campo-grupo">
                            <label> Selecciona el sexo </label>
                            <select defaultValue="" id="sexo" name="sexo" onChange={formik.handleChange} value={formik.values.sexo}>
                                <option value="" disabled>Seleccionar sexo</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                                <option value="O">Otro</option>
                            </select>
                        </div>
                        
                        <div className="campo-grupo">
                            <label htmlFor="rfc"> Ingresa el RFC </label>
                            <input type="text" placeholder="Ej: MOGF780404S36" id="rfc" name="rfc" onChange={formik.handleChange} value={formik.values.rfc}/>
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="curp"> Ingresa la CURP </label>
                            <input type="text" placeholder="Ej: PEGJ900314HDFMRN00" id="curp" name="curp" onChange={formik.handleChange} value={formik.values.curp}/>
                        </div>
                        
                        <div className="campo-grupo">
                            <label htmlFor="empleadoVoluntario"> Voluntario o empleado </label>
                            <select defaultValue="" id="empleadoVoluntario" name="empleadoVoluntario" onChange={formik.handleChange} value={formik.values.empleadoVoluntario}>
                                <option value="" disabled>Selecciona tipo de ayudante</option>
                                <option value="Voluntario">Voluntario</option>
                                <option value="Empleado">Empleado</option>
                            </select>
                        </div>
                        
                        <div className="campo-grupo">
                            <label> Eleccion de rol </label>
                            <select defaultValue="" id="rolid" name="rolid" onChange={formik.handleChange} value={formik.values.rolid}>
                                <option value="" disabled>Seleccionar rol</option>
                            </select>
                        </div>


                        <div className="campo-grupo">
                            <label htmlFor="correo"> Ingresa el correo </label>
                            <input type="email" placeholder="Correo" id="email" name="email" onChange={formik.handleChange} value={formik.values.email}/>
                        </div>
                        
                        <div className="campo-grupo">
                            <label htmlFor="codigoPostal"> Ingrese su código postal </label>
                            <input type="number" placeholder="Codigo Postal" id="codigoPostal" name="codigoPostal" onChange={formik.handleChange} value={formik.values.codigoPostal}/>
                        </div>

                        <div className="campo-grupo">
                            <select name="estadoNombre" id="estadoNombre" defaultValue="estadoNombre" onChange={formik.handleChange} value={formik.values.estadoNombre}>
                                <option value="" selected>Estado</option>
                            </select>
                        </div>
                        
                        <div className="campo-grupo">
                            <select name="municipioNombre" id="municipioNombre" defaultValue="municipioNombre" onChange={formik.handleChange} value={formik.values.municipioNombre}>
                                <option value="" selected>Municipio</option>
                            </select>
                        </div>
                        
                        <div className="campo-grupo">
                            <select name="coloniaNombre" id="coloniaNombre" defaultValue="coloniaNombre" onChange={formik.handleChange} value={formik.values.coloniaNombre}>
                                <option value="" selected>Colonia</option>
                            </select>
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="calle"> Ingresa la calle </label>
                            <input type="text" placeholder="Ej: Cerro Colmena" id="calle" name="calle" onChange={formik.handleChange} value={formik.values.calle}/>
                        </div>

                        <div className="campo-grupo radio-columna">
                            <label>¿Tiene numero interior o exterior?</label>
                            <div className="radio-opciones">
                                <div className="opcion-item">
                                    <input type="radio" id="si" name="sn" onChange={formik.handleChange} value={formik.values.sn}/>
                                    <label htmlFor="si">Sí</label>
                                </div>
                                <div className="opcion-item">
                                    <input type="radio" id="no" name="sn" onChange={formik.handleChange} value={formik.values.sn} />
                                    <label htmlFor="no">No</label>
                                </div>
                            </div>
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="numExterior"> Ingrese su numero exterior </label>
                            <input type="number" placeholder="Ej: 35" id="numExterior" name="numExterior" onChange={formik.handleChange} value={formik.values.numExterior}/>
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="numInterior"> Ingrese su numero interior </label>
                            <input type="number" placeholder="Ej: 40" id="numInterior" name="numInterior" onChange={formik.handleChange} value={formik.values.numInterior}/>
                        </div>

                        <div className="campo-grupo">
                            <label htmlFor="referencia"> Ingresa una referencia </label>
                        </div>
                        <input type="text" className="direccion" placeholder="Ej: Frente al parque" id="referencia" name="referencia" onChange={formik.handleChange} value={formik.values.referencia}/>

                        <button type="submit" className="btn-registrar">
                            Registrar
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default RegistrarEmpleado
