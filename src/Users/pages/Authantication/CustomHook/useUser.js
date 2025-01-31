import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../../util/httpsForUser/https";
// import { useEffect, useState } from "react";

export function useUser() {
    const { data: user, isFetching } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
        staleTime: 0, // لإعادة التحقق من الحالة فورًا
        cacheTime: 0,
    });
    return { isFetching, user, isAuth: user && true };
}
