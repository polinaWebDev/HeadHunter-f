import {authControllerLogout} from "../../client";

export const logoutApi = async () => {
    const res = await authControllerLogout();
    if (!res?.data) {
        throw new Error('Ошибка при логауте');
    }
    return res.data;
};