import { Navigate } from "react-router-dom";

function RutasProtegidas({ children, allowedRoles }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    try {
        console.log("TOKEN:", token);
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("PAYLOAD:", payload);

        if (!allowedRoles.includes(payload.rol)) {
            return <Navigate to="/" replace />;
        }

        return children;

    } catch (error) {
        return <Navigate to="/" replace />;
    }
}

export default RutasProtegidas;