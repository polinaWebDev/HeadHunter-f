import styles from "./style.module.css";
import { useAtom } from "jotai";
import { isAuthenticatedAtom } from "../../../viewmodels/state/authAtom.ts";
import { useLogout } from "../../../viewmodels/useLogout.ts";
import { Link } from "@tanstack/react-router";

const Header = () => {
    const [isAuthenticated] = useAtom(isAuthenticatedAtom);
    const logout = useLogout();

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <div className={styles.logo}>
                        <Link to="/">MyApp</Link>
                    </div>
                    <div className={styles.cta_nav}>
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile">Профиль</Link>
                                <button className={styles.logout} onClick={logout}>
                                    Выйти
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Вход</Link>
                                <Link to="/register">Регистрация</Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;