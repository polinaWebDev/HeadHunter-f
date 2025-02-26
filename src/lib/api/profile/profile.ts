import {userControllerGetProfile} from "../../client";

export const getProfileApi = async () => {
    const response = await userControllerGetProfile();
    if (!response?.data) {
        throw new Error('Ошибка при получении профиля');
    }
    return response.data;
}