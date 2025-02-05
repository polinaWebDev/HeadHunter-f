import {api} from "../../client";
import { authControllerLogin } from "../../client/gen/sdk.gen.ts";

export const login = async (email: string, password: string) => {
    const loginData = { email, password };
    const options = {
        body: loginData,
        client: api
    };

    return authControllerLogin(options);
};