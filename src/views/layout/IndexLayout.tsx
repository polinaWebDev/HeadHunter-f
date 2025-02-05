import { Outlet } from "@tanstack/react-router";
import Header from "../components/layout/Header.tsx";
import styles from "./style.module.css";

const IndexLayout = () => {
    return (
        <div>
            <Header/>
            <div className={styles.container}>
                <main>
                    <Outlet/>
                </main>
            </div>
            <footer>Футер</footer>
        </div>
    );
};

export default IndexLayout;