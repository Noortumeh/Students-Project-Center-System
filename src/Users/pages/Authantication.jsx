import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { useUser } from "./Authantication/CustomHook/useUser";

export function Authentication() {
    const { isFetching, isAuth } = useUser();
    
    if (isFetching) {
        return "loading ...";
    }
    
    if (!isAuth) {
        return <Navigate to="/" replace />;
    }
    
    return <Outlet />;
}