import {authControllerRefresh} from "../../client";

export const refreshTokenApi = async () => {
    const res = await authControllerRefresh()
    console.log("Response:", res?.data);
    return res?.data ?? null;
}