import { useState, useEffect, useRef } from "react";
import logo from "../../assets/img/logo.avif";
import "../../styles/header.css";
// Si vas a navegar a otras pantallas, descomenta la siguiente línea:
// import { Link } from "react-router-dom"; 

function Header() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    
    // 1. Creamos la referencia
    const menuRef = useRef(null);

    // 2. Creamos el efecto para escuchar los clics
    useEffect(() => {
        const manejarClicFuera = (evento) => {
            // Si el menú está abierto, existe la referencia, y el clic NO fue dentro de nuestro contenedor...
            if (menuAbierto && menuRef.current && !menuRef.current.contains(evento.target)) {
                setMenuAbierto(false); // ¡Lo cerramos!
            }
        };

        // Agregamos el "escuchador" de eventos a toda la página
        document.addEventListener("mousedown", manejarClicFuera);

        // Importante: Limpiamos el evento cuando el componente se desmonta para evitar bugs
        return () => {
            document.removeEventListener("mousedown", manejarClicFuera);
        };
    }, [menuAbierto]); // Solo se re-ejecuta si el estado del menú cambia

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

                {/* 3. Le ponemos la etiqueta "ref" a todo el contenedor del menú */}
                <div className="menu-contenedor" ref={menuRef}>
                    <div className="menu-icon" onClick={toggleMenu}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
                        </svg>
                    </div>

                    {menuAbierto && (
                        <div className="menu-desplegable">
                            <ul className="menu-lista">
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