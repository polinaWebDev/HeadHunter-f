import {useSetAtom} from "jotai";
import {authAtom} from "../state/authAtom";
import {getUserApi} from "../api/getUser";

export const useGetUser = () => {
    const setAuthToken = useSetAtom(authAtom);

    const fetchUser = async () => {
        try {
            const { token, userId } = await getUserApi(); // извлекаем данные напрямую
            setAuthToken(token); // сохраняем токен

            return { token, userId }; // отдаём структуру данных
        } catch (error) {
            console.error("Ошибка при получении пользователя:", error);
            setAuthToken(null); // очищаем токен
            return null; // обязательно вернём null, чтобы не было undefined
        }
    };

    return fetchUser;
};