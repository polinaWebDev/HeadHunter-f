'use client'
import {useRouter} from "next/navigation";
import {logoutApi} from "../../lib/api/auth/logout";
import {authAtom} from "../../lib/state/authAtom";
import {useAtom} from "jotai";
import {useGetProfile} from "../../lib/hooks/useGetProfile";
import {useGetUser} from "../../lib/hooks/useGetUser";

export const LogoutButton = () => {
    const [, setAuth] = useAtom(authAtom);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logoutApi();
            setAuth(null);
            await useGetProfile.reset('userProfile');
            await useGetUser.reset('user');
            router.push('/login');
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    return <button onClick={handleLogout}>Выйти</button>;
};
