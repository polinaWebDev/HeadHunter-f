import {authControllerRefresh} from "../../client";

export const refreshTokenApi = async () => {
    const res = await authControllerRefresh()
    return res?.data ?? null;
}