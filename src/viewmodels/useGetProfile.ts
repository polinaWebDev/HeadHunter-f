import { useQuery } from '@tanstack/react-query';
import {usersControllerGetProfile} from "../client";

const fetchUserProfile = async () => {
    const response = await usersControllerGetProfile();
    return response?.data ?? null; // Если data нет, возвращаем null
};

export const useUserProfile = () => {
    return useQuery({
        queryKey: ['userProfile'],
        queryFn: fetchUserProfile,
        staleTime: 1000 * 60 * 5, // 5 минут кеша
        retry: false, // Не делаем ретраи при ошибке
    });
};