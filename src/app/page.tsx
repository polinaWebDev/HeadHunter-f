"use client"

import {useGetProfile} from "../lib/hooks/useGetProfile";
import {useRefreshToken} from "../lib/hooks/useRefreshToken";
import {AxiosError} from "axios";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function HomePage() {
    const router = useRouter();
    const { data: user, isLoading, error, refetch } = useGetProfile.useQuery({
        // Если запрос завершился с ошибкой 401, то мы пытаемся обновить токены
        onError: async (error: AxiosError) => {
            if (error.response?.status === 401) {
                // Запуск мутации обновления токенов
                useRefreshToken.useMutation();
                await refetch()
            }
        },
    }, {

    });
    const { data: token, mutate: refreshTokens, isPending: refreshing} = useRefreshToken.useMutation();

    if (error && (error as AxiosError).response?.status === 401) {
        refreshTokens(token);
    }

    useEffect(() => {
        console.log("Home component rendered");
    }, []);


    // Если идет загрузка данных профиля
    if (isLoading || refreshing) return <p>Loading...</p>;

    // Если произошла ошибка
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    // Если профиля нет
    if (!user) return <p>Profile not found</p>;

    const goToProfile = () => {
        router.push("/profile");
    }


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Главная страница</h1>
            {user ? (
                <p>Добро пожаловать, {user.firstName}!</p>
            ) : (
                <p>Вы не авторизованы</p>
            )}
            <button onClick={goToProfile} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
                На профиль
            </button>
        </div>
    );
}