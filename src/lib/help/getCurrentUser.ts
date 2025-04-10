import {cookies} from "next/headers";

export async function getCurrentUser() {
    const coockieStorage = await cookies();
    const token = coockieStorage.get("accessToken")?.value;
    console.log(token);
    if (!token) return null


    try {
        const res = await fetch("http://localhost:3002/auth/me", {
            headers: {
                Authrization: `Bearer ${token}`,
            },
            cache: "no-store",
        })

        console.log(res.status)

        if (!res.ok) {
            return console.error(res.text)
        }

        const me = await res.json();
        return me
    } catch {
        return null
    }
}
