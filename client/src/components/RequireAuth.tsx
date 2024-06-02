import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useProfile } from "../contexts";

const RequireAuth = () => {
    const profile = useProfile();
    const location = useLocation();

    return profile?.userName ? (
        <Outlet />
    ) : (
        <Navigate to="/signin" state={{ from: location }} replace />
    );
};

export default RequireAuth;
