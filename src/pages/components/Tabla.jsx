import "../../styles/tabla.css"

function Tabla() {
    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre Completo</th>
                    <th>Edad</th>
                    <th>Sexo</th>
                    <th>RFC</th>
                    <th>CURP</th>
                    <th>Estado</th>
                    <th>Más información</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>José Perez Leon</td>
                    <td>48</td>
                    <td>Masculino</td>
                    <td>RFC</td>
                    <td>CURP</td>
                    <td>Puntito</td>
                    <td>Más</td>
                </tr>
            </tbody>

        </table>
    )
}

export default Tabla