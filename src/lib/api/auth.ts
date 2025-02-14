import {authControllerLogin, authControllerRegister, LoginDto, RegisterDto} from "../../client";
import {useApiQuery} from "../help/ApiQuery.ts";

export const registerApi = async (data: RegisterDto) => {
    return authControllerRegister({body: data})
}

export const loginApi = async (data: LoginDto) => {
    return authControllerLogin({ body: data });
};

export const useLoginQuery = useApiQuery({
    key: "login",
    req: loginApi,
});