import {userControllerGetProfile} from "../../client";

export const getProfileApi = async () => {
    const response = await userControllerGetProfile();
    return response?.data ?? null;
}