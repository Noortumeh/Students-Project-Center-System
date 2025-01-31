import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { useUser } from "./Authantication/CustomHook/useUser";
import { getTokenDuration } from "../../util/httpsForUser/https";
import { useLogout } from "./Authantication/CustomHook/useLogout";
import { useEffect } from "react";

export function Authentication() {
    const { isFetching, isAuth, user } = useUser();
    const { logoutMutate } = useLogout();

    async function handleLogout() {
        try {
            await logoutMutate();
        } catch (err) {
            toast.error("Invalid Credentials!");
        }
    }

    useEffect(() => {
        if (!isAuth) {
            return;
        }

        if (user && user.token === "EXPIRED") {
            handleLogout();
            return;
        }

        const tokenDuration = getTokenDuration();
        const timeoutId = setTimeout(() => {
            handleLogout();
        }, tokenDuration);

        return () => clearTimeout(timeoutId);
    }, [isAuth, user?.token]);

    if (isFetching) {
        return null;
    }

    if (!isAuth) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
