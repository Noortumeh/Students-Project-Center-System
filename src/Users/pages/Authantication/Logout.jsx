import { Button } from "@mui/material";
import { useLogout } from "./CustomHook/useLogout";
import { useUser } from "./CustomHook/useUser";

export default function Logout() {
    const { logoutMutate, isPending, error, isError } = useLogout();
    const { isAuth } = useUser();
    async function handleLogout() {
        try {
            if (isAuth) {
                await logoutMutate();
            }
        } catch (err) {
            console.log('Invalid Credentials!');
        }
    }

    return (
        <Button
            onClick={handleLogout}
            disabled={isPending}
            variant="contained" color="primary">
            {isPending ? 'Logging out...' : 'Logout'}
        </Button>
    );
}