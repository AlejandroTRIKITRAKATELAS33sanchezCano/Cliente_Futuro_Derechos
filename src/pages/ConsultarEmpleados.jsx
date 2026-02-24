import Header from "./components/Header"
import Tabla from "./components/Tabla"
import Buscador from "./components/Buscador"
import "../styles/ConsultarEmpleados.css";
import { useEffect, useState } from "react";

function ConsultarEmpleados() {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/usuarios")
            .then(res => res.json())
            .then(data => {
                setUsuarios(data);
            })
            .catch(error => console.error("Error:", error));
    }, []);

    return (
        <>
            <Header />
            <section className="SeccionEmpleados">
                <Buscador />
                <Tabla usuarios={usuarios} />
            </section>
        </>
    )
}

export default ConsultarEmpleados