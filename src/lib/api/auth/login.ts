import {authControllerLogin, LoginDto} from "../../client";

export const loginApi = async (data: LoginDto) => {
    return authControllerLogin({ body: data });
};


