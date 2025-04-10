"use client";
import {useGetUser} from "@/lib/hooks/useGetUser";
import {redirect} from "next/navigation";
import {UserProvider} from "@/lib/providers/UserProvider";
import { ReactNode } from "react";

export function UserGuard({ children }: { children: ReactNode }) {
    const { data: user, isLoading, error } = useGetUser.useQuery({});

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка</div>;
    if (!user) throw redirect("/login");

    return (
        <UserProvider user={user}>
            {children}
        </UserProvider>
    );
}