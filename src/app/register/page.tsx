// src/app/register/page.tsx
"use client";


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {useRegisterMutation} from "../../lib/hooks/useRegister";
import {RegisterDto} from "../../lib/client";
import {useAtom} from "jotai";
import {useRouter} from "next/navigation";
import {authAtom} from "../../lib/state/authAtom";

export default function RegisterForm() {
    const { register, handleSubmit } = useForm<RegisterDto>();
    const [avatar, setAvatar] = useState<File | null>(null);
    const mutation = useRegisterMutation.useMutation();
    const [authUser, setAuthToken] = useAtom(authAtom);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            console.log("File:", e.target.files);
            setAvatar(e.target.files[0]);
        }
    };


    const onSubmit = async (data: RegisterDto) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });


        if (avatar) {
            console.log("Avatar:", avatar);
            formData.append("avatar_url", avatar);
        }


        try {
            await mutation.mutateAsync(formData);

            // Сохранение токена в куки
            // if (response.token) {
            //     Cookies.set("accessToken", response.token, { expires: 1 }); // 1 день
            // }

            // setAuthToken(true);
            router.push("/profile");
        } catch (error) {
            console.error("Ошибка регистрации:", error);
        }

    };


    return (
        <div className="p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 border p-4 rounded-lg">
                <input {...register("email")} type="email" placeholder="Email" required className="border p-2" />
                <input {...register("password")} type="password" placeholder="Пароль" required className="border p-2" />
                <input {...register("firstName")} type="text" placeholder="Имя" required className="border p-2" />
                <input {...register("lastName")} type="text" placeholder="Фамилия" required className="border p-2" />
                <select {...register("profile_type")} required className="border p-2">
                    <option value="employer">Работодатель</option>
                    <option value="job_seeker">Соискатель</option>
                </select>
                <input type="file" accept="image/*" onChange={handleFileChange} className="border p-2" />
                <button type="submit" disabled={mutation.isPending} className="p-2 bg-blue-500 text-white">
                    {mutation.isPending ? "Загрузка..." : "Зарегистрироваться"}
                </button>
            </form>

            {authUser && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-100">
                    <h2 className="text-lg font-bold">Вы зарегистрированы!</h2>
                </div>
            )}
        </div>
    );
}