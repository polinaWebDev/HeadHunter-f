"use client"

import {ReactNode} from "react";
import {UserDto} from "@/lib/client";
import { UserContext } from "../hooks/useUser";

export function UserProvider({user, children}: {user: UserDto,children: ReactNode}) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
