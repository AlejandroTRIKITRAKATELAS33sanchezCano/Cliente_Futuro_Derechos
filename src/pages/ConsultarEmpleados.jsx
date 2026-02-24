import { useState } from "react";
import Header from "./components/Header"
import Tabla from "./components/Tabla"
import Buscador from "./components/Buscador"
import "../styles/ConsultarEmpleados.css";

// Movemos los datos aquí temporalmente (luego vendrán de tu base de datos)
const datosIniciales = [
    { id: 1, nombre: "José Perez León", edad: 48, sexo: "Masculino", rfc: "RFC123", curp: "CURP123", activo: true },
    { id: 2, nombre: "María García", edad: 35, sexo: "Femenino", rfc: "RFC456", curp: "CURP456", activo: false },
    { id: 3, nombre: "Carlos Slim", edad: 50, sexo: "Masculino", rfc: "RFC789", curp: "CURP789", activo: true }
];

function ConsultarEmpleados() {
    // Estado para guardar lo que el usuario escribe en el buscador
    const [busqueda, setBusqueda] = useState("");

    // Filtramos los datos: si el nombre incluye lo que está en 'busqueda', lo conservamos
    const usuariosFiltrados = datosIniciales.filter((usuario) =>
        usuario.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <>
            <Header />
            <section className="SeccionEmpleados">
                {/* Le pasamos el texto actual y la función para cambiarlo al Buscador */}
                <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />
                
                {/* Le pasamos los datos YA FILTRADOS a la Tabla */}
                <Tabla usuarios={usuariosFiltrados} />
            </section>
        </>
    )
}

export default ConsultarEmpleados;