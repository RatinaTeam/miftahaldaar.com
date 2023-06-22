import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { isLoading, isSignedInAlready } = useContext(AuthContext);


    if (!isSignedInAlready && !isLoading) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (isSignedInAlready && !isLoading) {
        return children;
    }
};

export default PrivateRoute;
