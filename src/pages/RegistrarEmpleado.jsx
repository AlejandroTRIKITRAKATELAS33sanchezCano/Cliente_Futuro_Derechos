import { useState } from "react"
import Header from "./components/Header"
import "../styles/registrarEmpleado.css"

function RegistrarEmpleado() {

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

                    <form className="formulario">
                        <input type="text" placeholder="Nombre" />
                        <input type="text" placeholder="Primer Apellido" />
                        <input type="text" placeholder="Segundo Apellido" />

                        <input type="date" placeholder="Fecha de Nacimiento" />

                        <select defaultValue="">
                            <option value="" disabled>Seleccionar sexo</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>

                        <input type="text" placeholder="RFC" />
                        <input type="text" placeholder="CURP" />

                        <select defaultValue="">
                            <option value="" disabled>Selecciona tipo de ayudante</option>
                            <option value="Voluntario">Voluntario</option>
                            <option value="Empleado">Empleado</option>
                        </select>

                        <select defaultValue="">
                            <option value="" disabled>Seleccionar rol</option>
                            <option value="Coordinador">Coordinador</option>
                            <option value="Psicologo">Psicólogo</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Abogado">Abogado</option>
                            <option value="Trabajador Social">Trabajador Social</option>
                            <option value="Analista">Analista</option>
                        </select>

                        <input type="text" placeholder="Correo"/>
                        <input type="text" className="Contraseña" placeholder="Contraseña"/>

                        <input type="number" placeholder="Codigo Postal"/>
                        <select name="" id="">
                            <option value="" selected>Municipio</option>
                            <option value="">Gustavo A. Madero</option>
                            <option value="">Benito Juarez</option>
                        </select>
                        <select name="" id="">
                            <option value="" selected>Colonia</option>
                            <option value="">Valle De Madero</option>
                            <option value="">Gustavo Diaz Ordaz</option>
                        </select>
                        <input type="text" placeholder="Dirección" className="direccion" />

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
