import "../../styles/buscador.css"

function Buscador() {
    return (
        <div className="buscador">
            <input 
                type="text" 
                placeholder="Buscar..."
                className="buscador-input"
            />
            <button className="buscador-btn">+</button>
        </div>
    )
}

export default Buscador