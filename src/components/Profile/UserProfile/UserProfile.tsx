import {UserDto} from "@/lib/client";
import React from "react";
import styles from './styles.module.css';

interface UserProfileProps {
    user: UserDto;
}

export const UserProfile: React.FC<UserProfileProps>= ({user}) => {
    return (
        <div className={styles.profile}>
            <div className={styles.main_info}>
                <h1>{user.firstName}</h1>
                <p>{user.email}</p>
            </div>
            <img src={"http://localhost:3002/"+user.avatar_url} className={styles.avatar} alt=""/>
        </div>
    );
}