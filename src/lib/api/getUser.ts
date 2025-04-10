import {userControllerGetMe} from "@/lib/client";


export const getUserApi = async () => {
    try {
        const { data } = await userControllerGetMe();
        if (!data) {
            throw new Error("Ошибка при получении пользователя");
        }
        return data;
    } catch (error) {
        console.error("Ошибка при получении пользователя:", error);
        return null;
    }
};