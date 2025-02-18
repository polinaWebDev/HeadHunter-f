"use client";

import React, { useState } from "react";
import {loginMutation} from "../../lib/hooks/useLogin";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const mutation = loginMutation.useMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({ email, password });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Logging in..." : "Login"}
            </button>
            {mutation.error && <p className="text-red-500">Error: {mutation.error.message}</p>}
        </form>
    );
}