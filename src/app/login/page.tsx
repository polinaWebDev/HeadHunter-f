"use client";

import { useState } from "react";
import {useLoginQuery} from "../../lib/api/auth.ts";

export default function Login() {
    console.log("Rendering Login page");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = useLoginQuery({ email, password }, { enabled: false });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login.refetch();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
            {login.isLoading && <p>Loading...</p>}
            {login.error && <p>Error: {login.error.message}</p>}
        </form>
    );
}