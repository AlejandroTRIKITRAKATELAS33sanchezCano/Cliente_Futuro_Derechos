import Tabla from "./components/Tabla"
import Header from "./components/Header"
import Buscador from "./components/Buscador"
import "../styles/ConsultarEmpleados.css";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function ConsultarEmpleados() {

    // Estado para guardar lo que el usuario escribe en el buscador
    const [busqueda, setBusqueda] = useState("");

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
    const obtenerUsuarios = async () => {
        try {
            const response = await axiosInstance.get("/usuarios");
            setUsuarios(response.data);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        }
    };

    obtenerUsuarios();
}, []);
    // Filtramos los datos: si el nombre incluye lo que está en 'busqueda', lo conservamos
    const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.nombre_completo
            ?.toLowerCase()
            .includes(busqueda.toLowerCase())
    );

    return (
        <>
            <Header />
            <section className="SeccionEmpleados">
                <Buscador busqueda={busqueda} setBusqueda={setBusqueda} />
                <Tabla usuarios={usuariosFiltrados} />
            </section>
        </>
    )
}
export default ConsultarEmpleados;