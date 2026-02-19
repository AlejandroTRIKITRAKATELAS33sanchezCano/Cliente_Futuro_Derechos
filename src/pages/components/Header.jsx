import logo from "../../assets/img/logo.avif";
import "../../styles/header.css";


function Header() {
    return (
        <nav className="header">
            <div className="logo">
                <img src={logo} alt="Futuro con derechos" />
                <h3>Futuro Con Derechos</h3>
            </div>
        </nav>
    )
}

export default Header