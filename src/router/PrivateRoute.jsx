import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { isLoading, user } = useContext(AuthContext);

    if (!user && !isLoading) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (user && !isLoading) {
        return children;
    }
};

export default PrivateRoute;
