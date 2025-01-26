import { Button, MenuItem } from "@mui/material";
import { useLogout } from "./CustomHook/useLogout";
import { useUser } from "./CustomHook/useUser";
import { toast } from "react-toastify";

export default function Logout() {
    const { logoutMutate, isPending} = useLogout();
    const { isAuth } = useUser();
    async function handleLogout() {
        try {
            if (isAuth) {
                await logoutMutate();
            }
        } catch (err) {
            toast.error('Invalid Credentials!');
        }
    }

    return (
        <MenuItem
            onClick={handleLogout}
            disabled={isPending}
            sx={{color: '#DF0404'}}
            >
            {isPending ? 'Logging out...' : 'Logout'}
        </MenuItem>
    );
}