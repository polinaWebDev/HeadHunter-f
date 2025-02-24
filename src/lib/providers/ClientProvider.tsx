import {useGetUser} from "../hooks/useGetUser";
import {useSetAtom} from "jotai";
import {authAtom} from "../state/authAtom";
import {useRefreshToken} from "../hooks/useRefreshToken";
import {useEffect} from "react";
import {AxiosError} from "axios";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
    const { data: user, isPending } = useGetUser.useQuery({});
    const setAuthToken = useSetAtom(authAtom);
    const { mutate: refreshTokens, isPending: isRefreshing, error } = useRefreshToken.useMutation();

    useEffect(() => {
        if (user?.token) {
            setAuthToken(user.token);
            console.log("User token:", user.token);
        }
    }, [user, setAuthToken]);

    // useEffect(() => {
    //     if (error && (error as AxiosError).response?.status === 401) {
    //         const oldToken = user?.token;
    //         if (oldToken) {
    //             console.log("Refreshing token...");
    //             refreshTokens(oldToken);
    //         }
    //     }
    // }, [error, refreshTokens, user]);

    if (isPending || isRefreshing) {
        return <p>Loading...</p>;
    }

    console.log("ClientProvider rendered");

    return <>{children}</>;
}