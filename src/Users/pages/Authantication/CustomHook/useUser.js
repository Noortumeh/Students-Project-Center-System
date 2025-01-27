import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../../util/httpsForUser/https";
// import { useEffect, useState } from "react";

export function useUser() {
    // const [shouldReload, setShouldReload] = useState(false);
    const { data: user, isFetching } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
        staleTime: 0, // لإعادة التحقق من الحالة فورًا
        cacheTime: 0,
    });
    // useEffect(() => {
    //     // if(user){
    //         setShouldReload((prev) => !prev);
    //         console.log("test2")
    //         // window.location.reload();
    //     // }
    // },[])
    return { isFetching, user, isAuth: user && true };
}
