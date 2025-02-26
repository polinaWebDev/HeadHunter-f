import {authControllerGetMe} from "../client";

export const getUserApi = async () => {
    try {
        const { data } = await authControllerGetMe();
        if (!data) {
            throw new Error("Ошибка при получении пользователя");
        }
        const token = data.token;
        return { token };
    } catch (error) {
        console.error("Ошибка при получении пользователя:", error);
        return null;
    }
};