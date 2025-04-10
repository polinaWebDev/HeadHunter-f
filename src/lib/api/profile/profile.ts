import {cache} from "react";
import {userControllerGetMe} from "@/lib/client";

export const getProfileApi = cache(async () => {
    const response = await userControllerGetMe();
    return response?.data ?? null;
})