"use client"

import {useGetProfile} from "../lib/hooks/useGetProfile";

export default function HomePage() {
    const { data: user, isLoading, error } = useGetProfile.useQuery({});

    if (isLoading ) return <p>Loading...</p>;

    if (error) return <p className="text-red-500">Error: {error.message}</p>;


    return (
        <div>
            {user ? (
                <p>Добро пожаловать, {user.firstName}!</p>
            ) : (
                <p>Вы не авторизованы</p>
            )}
        </div>
    );
}