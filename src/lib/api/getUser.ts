import {authControllerGetMe} from "../client";

export const getUserApi = async () => {
    const {data} = await authControllerGetMe();
    if (!data) {
        throw new Error("Некорректный ответ от сервера");
    }
    return data
}