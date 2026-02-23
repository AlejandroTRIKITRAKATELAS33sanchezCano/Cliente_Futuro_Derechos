import { useState } from "react"; // Importamos useState de React
import logo from "../../assets/img/logo.avif";
import "../../styles/header.css";
// Si vas a navegar a otras pantallas, descomenta la siguiente línea:
// import { Link } from "react-router-dom"; 

function Header() {
    // Estado para controlar si el menú está abierto (true) o cerrado (false)
    const [menuAbierto, setMenuAbierto] = useState(false);

    // Función que invierte el estado actual al hacer clic
    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    return (
        <nav className="header">
            <div className="logo">
                <img src={logo} alt="Futuro con derechos" />
                <h3>Futuro Con Derechos</h3>
            </div>

            <div className="header-right">
                <div className="user-profile">
                    <div className="avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <span className="user-name">Virginia</span>
                </div>

                {/* Contenedor relativo para agrupar el ícono y su menú desplegable */}
                <div className="menu-contenedor">
                    <div className="menu-icon" onClick={toggleMenu}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
                        </svg>
                    </div>

                    {/* El menú solo se renderiza si menuAbierto es true */}
                    {menuAbierto && (
                        <div className="menu-desplegable">
                            <ul className="menu-lista">
                                {/* Puedes cambiar los <li> por <Link> de react-router-dom si lo necesitas */}
                                <li className="menu-item">Inicio</li>
                                <li className="menu-item">Empleados</li>
                                <li className="menu-item">Configuración</li>
                                <hr className="menu-divisor" />
                                <li className="menu-item salir">Cerrar Sesión</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Header;