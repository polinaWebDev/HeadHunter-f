import {useAtomValue} from "jotai";
import {authAtom} from "../../../lib/state/authAtom";
import Link from "next/link";
import {useGetProfile} from "../../../lib/hooks/useGetProfile";
import styles from './styles.module.css'
import {LogoutButton} from "../../UI/LogoutButton";


const Header: React.FC = () => {

    const { data: user } = useGetProfile.useQuery({});
    const token = useAtomValue(authAtom);


    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/">
                    <img src='/logo.svg' alt=""/>
                </Link>
                {token && user ? (
                    <nav className={styles.nav}>
                        {user.profile_type === 'employer' ? (
                            <Link href="/my-companies">Мои компании</Link>
                        ) : (
                            <Link href="/my-resumes">Мои резюме</Link>
                        )}
                        <Link href="/profile">Профиль</Link>
                        <LogoutButton/>
                    </nav>
                ) : (
                    <nav className={styles.nav}>
                        <Link href="/login">Войти</Link>
                        <Link href="/register">Регистрация</Link>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;