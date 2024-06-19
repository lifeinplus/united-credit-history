import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts";

interface Props {
    allowedRoles: number[];
}

const RequireAuth = ({ allowedRoles }: Props) => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.roles?.find((role) => allowedRoles.includes(role)) ? (
        <Outlet />
    ) : auth?.userName ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
