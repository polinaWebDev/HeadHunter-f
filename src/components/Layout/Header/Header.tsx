"use client"

import Link from "next/link";
import styles from './styles.module.css'
import {LogoutButton} from "../../UI/LogoutButton";
import {useUser} from "@/lib/hooks/useUser";


const Header: React.FC = () => {

    const user = useUser();




    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/">
                    <img src='/logo.svg' alt=""/>
                </Link>
                {user ? (
                    <nav className={styles.nav}>
                        {user.profile_type === 'employer' ? (
                            <Link href="/company">Мои компании</Link>
                        ) : (
                            <Link href="/my-resumes">Мои резюме</Link>
                        )}
                        <Link href="/profile">Профиль</Link>
                        <p>Name: {user.firstName}</p>
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