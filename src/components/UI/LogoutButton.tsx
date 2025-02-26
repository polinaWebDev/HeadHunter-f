import {useRouter} from "next/navigation";
import {logoutApi} from "../../lib/api/auth/logout";
import {authAtom} from "../../lib/state/authAtom";
import {useAtom} from "jotai";
import {queryClient} from "../../lib/help/queryClient";

export const LogoutButton = () => {
    const [, setAuth] = useAtom(authAtom);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logoutApi();
            router.push('/login');
            setAuth(null);
            await queryClient.resetQueries();
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    return <button onClick={handleLogout}>Выйти</button>;
};
