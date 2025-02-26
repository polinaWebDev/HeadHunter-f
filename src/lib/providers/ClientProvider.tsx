import {useGetUser} from "../hooks/useGetUser";
import {useSetAtom} from "jotai";
import {authAtom} from "../state/authAtom";
import {useRefreshToken} from "../hooks/useRefreshToken";
import {useEffect} from "react";
import Header from "../../components/Layout/Header/Header";


export default function ClientProvider({ children }: { children: React.ReactNode }) {
    const { data: user, isPending } = useGetUser.useQuery({});
    const setAuthToken = useSetAtom(authAtom);
    const { mutate: refreshTokens, isPending: isRefreshing, error } = useRefreshToken.useMutation();

    useEffect(() => {
        if (error && error.response?.status === 401) {
            refreshTokens(user?.token);
        }
    }, [error, refreshTokens]);

    useEffect(() => {
        if (user?.token) {
            setAuthToken(user.token);
            console.log("User token:", user.token);
        }
    }, [user, setAuthToken]);


    if (isPending || isRefreshing) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error("Ошибка", error);
    }

    console.log("ClientProvider rendered");

    return (
        <div>
            <Header/>
            <div className="container">
                {children}
            </div>
        </div>
    )

}