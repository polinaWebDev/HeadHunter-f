"use client"

import {useGetProfile} from "@/lib/hooks/useGetProfile";
import {UserProfile} from "@/components/Profile/UserProfile/UserProfile";

export default function Profile() {
    const { data: user, isLoading, error } = useGetProfile.useQuery({});

    console.log('user', user);
    console.log('isLoading', isLoading);
    console.log('error', error);

    if (isLoading ) {
        console.log('111')
        return <p>Loading...</p>
    }

    if (error) {
        console.error("Ошибка или пустой ответ:", error);
        return <p>Не удалось загрузить профиль.</p>;
    }

    if (!user) {
        return <p>Юзер не найден</p>
    }

    return (
        <UserProfile user={user}/>
    );
}