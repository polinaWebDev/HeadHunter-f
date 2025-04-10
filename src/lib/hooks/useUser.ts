"use client";
import {createContext, useContext} from "react";
import {UserDto} from "@/lib/client";

export const UserContext = createContext<UserDto | null>(null);

export function useUser() {
    const user = useContext(UserContext);
    if (!user) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return user;
}
