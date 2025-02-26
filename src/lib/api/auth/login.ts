import {authControllerLogin, LoginDto} from "../../client";

export const loginApi = async (data: LoginDto) => {
    const response = await authControllerLogin({ body: data });
    if (!response.data) {
        throw new Error("Некорректный ответ от сервера");
    }
    return response.data;
};


