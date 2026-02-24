import HeaderSimple from "./components/HeaderSimple"; // Ajusta la ruta si es necesario
import { useState } from "react";
import logo from "../assets/img/logo.avif";
import "../styles/Login.css";

function Login() {
    const [credenciales, setCredenciales] = useState({
        usuario: "",
        password: ""
    });

    const manejarCambio = (e) => {
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        });
    };

    const manejarEnvio = (e) => {
        e.preventDefault();
        console.log("Intentando iniciar sesión con:", credenciales);
    };

    return (
        <div className="login-page">
            {/* Imagen gigante de fondo (marca de agua) */}
            <img src={logo} alt="Fondo Logo" className="marca-agua" />

            <HeaderSimple />

            <main className="login-main">
                <div className="login-tarjeta">
                    {/* ... (Todo tu formulario se queda exactamente igual) ... */}
                    <h1 className="login-titulo">Iniciar Sesión</h1>
                    <p className="login-subtitulo">Ingresa tus credenciales para continuar</p>

                    <form onSubmit={manejarEnvio} className="login-formulario">
                        <div className="input-grupo">
                            <label htmlFor="usuario">Usuario o Correo</label>
                            <input 
                                type="text" 
                                id="usuario" 
                                name="usuario"
                                value={credenciales.usuario}
                                onChange={manejarCambio}
                                placeholder="Ej. virginia@futuro.org" 
                                required 
                            />
                        </div>

                        <div className="input-grupo">
                            <label htmlFor="password">Contraseña</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password"
                                value={credenciales.password}
                                onChange={manejarCambio}
                                placeholder="••••••••" 
                                required 
                            />
                        </div>

                        <button type="submit" className="login-btn">Entrar</button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Login;import Header from "./components/Header";

function Login(){
    return (
        <>
        <Header />
        <label for="user">Usuario:</label>
        </>
    )
}

export default Login