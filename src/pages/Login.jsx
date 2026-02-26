import HeaderSimple from "./components/HeaderSimple"; // Ajusta la ruta si es necesario
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.avif";
import "../styles/Login.css";

function Login() {
    
    const navigate = useNavigate();

    const [credenciales, setCredenciales] = useState({
        usuario: "",
        password: ""
    });

    const [error, setError] = useState("");

    const manejarCambio = (e) => {
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "http://localhost:3000/api/login",
                {
                    email: credenciales.usuario,
                    password: credenciales.password
                }
            );

            //Guardar token
            localStorage.setItem("token", response.data.token);

            //Redirigir
            navigate("/administrador/consultarEmpleados");

        } catch (err) {
            setError(
                err.response?.data?.message || "Error al iniciar sesión"
            );
        }
    };

    return (
        <div className="login-page">
            <img src={logo} alt="Fondo Logo" className="marca-agua" />

            <HeaderSimple />

            <main className="login-main">
                <div className="login-tarjeta">
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
                        {error && <p className="login-error">{error}</p>}
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Login;