import Header from "./components/Header"
import Tabla from "./components/Tabla"
import Buscador from "./components/Buscador"
import "../styles/ConsultarEmpleados.css";

function ConsultarEmpleados() {
    return (
        <>
            <Header />
            <section className="SeccionEmpleados">
                <Buscador />
                <Tabla />
            </section>
        </>
    )
}

export default ConsultarEmpleados