import logo from "../../assets/img/logo.avif";
import "../../styles/header.css";


function Header() {
    return (
        <nav className="header">
            <div className="logo">
                <img src={logo} alt="Futuro con derechos" />
                <h3>Futuro Con Derechos</h3>
            </div>
            
            <div className="header-right">
                <div className="user-profile">
                    <div className="avatar">
                        {/* Ícono de usuario en SVG */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <span className="user-name">Virginia</span>
                </div>

                <div className="menu-icon">
                    {/* Ícono de menú de lista (similar al de Figma) */}
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
                    </svg>
                </div>
            </div>
        </nav>
    )
}

export default Header;