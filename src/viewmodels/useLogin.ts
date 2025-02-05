import {useMutation} from "@tanstack/react-query";
import {login} from "../model/services/authService.ts";
import {LoginDto, LoginResponse} from "../client";
import {useAtom} from "jotai";
import {authTokenAtom, userIdAtom} from "./state/authAtom.ts";
import {useNavigate} from "@tanstack/react-router";

export const useLogin = () => {
    const [ , setAuthToken] = useAtom(authTokenAtom);
    const [, setUserId] = useAtom(userIdAtom);
    const navigate = useNavigate();

    return useMutation<LoginResponse, Error, LoginDto>({
        mutationFn: async ({ email, password }) => {
            const response = await login(email, password);
            if (!response.data) {
                throw new Error("Некорректный ответ от сервера");
            }
            return response.data;
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", String(data.user_id))

            setUserId(data.user_id);
            setAuthToken(data.token);

            navigate({to: "/"});
        },
        onError: (error) => {
            console.error("Ошибка авторизации:", error);
        },
    });
};