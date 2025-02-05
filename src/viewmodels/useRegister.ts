import {authTokenAtom, userIdAtom} from "./state/authAtom.ts";
import {useAtom} from "jotai";
import {useNavigate} from "@tanstack/react-router";
import {useMutation} from "@tanstack/react-query";
import {formDataApi, RegisterResponse} from "../client";

export const useRegister = () => {
    const [, setAuthToken] = useAtom(authTokenAtom);
    const [, setUserId] = useAtom(userIdAtom);
    const navigate = useNavigate();


    return useMutation<RegisterResponse, Error, FormData>({
        mutationFn: async (formData: FormData) => {
            // Отправляем formData на сервер
            const response = await formDataApi.post('/auth/register', formData);

            if (!response.data) {
                throw new Error("Некорректный ответ от сервера");
            }

            return response.data as RegisterResponse;
        },
        onSuccess: data => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", String(data.user.id));

            // Обновляем глобальный стейт
            setAuthToken(data.token);
            setUserId(data.user.id);

            // Перенаправляем на главную страницу
            navigate({to: "/"});
        },
        onError: (error) => {
            console.error("Ошибка регистрации:", error);
        },
    })
}