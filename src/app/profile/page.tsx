"use client"

import {useGetProfile} from "../../lib/hooks/useGetProfile";
import { useAuth} from "../../lib/state/authAtom";
import {useRouter} from "next/navigation";

export default function Profile() {
    const { data: user, isLoading, error } = useGetProfile.useQuery({});
    const [token] = useAuth();
    const router = useRouter();

    if (isLoading) return <p>Loading...</p>;

    if (error || !user) {
        console.error("Ошибка или пустой ответ:", error);
        return <p>Не удалось загрузить профиль.</p>;
    }

    if (!token) {
        return <p>Токен не найден. Пожалуйста, войдите в систему.</p>;
    }

    const goToHome = () => {
        router.push("/");
    };

    return (
        <>
            <div>Ваш ID: {user.id}</div>
            <button onClick={goToHome} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
                На главную
            </button>
        </>
    );
}