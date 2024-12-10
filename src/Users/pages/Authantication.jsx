import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "./Authantication/CustomHook/useUser";
import { useEffect } from "react";

export function Authentication() {
    const { isFetching, isAuth } = useUser();
    const navigate = useNavigate();

    useEffect( () => {
        if (!isAuth) {
            navigate('/', { replace: true });
        }
    }, [isAuth, navigate]);

    if (isFetching) {
        return (
            "loading ..."
        );
    }

    return isAuth ? <Outlet /> : null;
}