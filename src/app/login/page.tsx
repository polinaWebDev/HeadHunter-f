"use client";

import React, {useState} from "react";
import {useLoginMutation} from "@/lib/hooks/useLogin";
import {useAuth} from "@/lib/state/authAtom";
import {useRouter} from "next/navigation";
import {useGetUser} from "@/lib/hooks/useGetUser";
import {useGetProfile} from "@/lib/hooks/useGetProfile";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, setAuth] = useAuth();
    const router = useRouter();

    const mutation = useLoginMutation.useMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Ждем завершения мутации
            const data = await mutation.mutateAsync({ email, password });

            if (data) {
                setAuth(data.token);
                await useGetUser.refetch('user');
                await useGetProfile.refetch('userProfile');
                router.push("/profile");
            } else {
                console.error("Ошибка авторизации: нет данных");
            }
        } catch (error) {
            console.error("Ошибка регистрации:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}