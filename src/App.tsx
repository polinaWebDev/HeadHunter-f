import {useAtom} from "jotai";
import {authTokenAtom, userIdAtom} from "./viewmodels/state/authAtom.ts";
import {useEffect} from "react";
import {RouterProvider} from "@tanstack/react-router";
import {router} from "./router.tsx";

export const App = () => {
    const [, setAuthToken] = useAtom(authTokenAtom);
    const [, setUserId] = useAtom(userIdAtom);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (token && userId) {
            setAuthToken(token);
            setUserId(Number(userId));
        }
    }, []);

    return <RouterProvider router={router} />;
};