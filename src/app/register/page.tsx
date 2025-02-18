// src/app/register/page.tsx
"use client";


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {registerMutation} from "../../lib/hooks/useRegister";
import {RegisterDto} from "../../lib/client";

export default function RegisterForm() {
    const { register, handleSubmit } = useForm<RegisterDto>();
    const [avatar, setAvatar] = useState<File | null>(null);
    const mutation = registerMutation.useMutation();

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


        console.log(formData.get("avatar_url"));


        try {
            const x = await mutation.mutateAsync(formData);

            console.log("Регистрация успешна!", x);
        } catch (error) {
            console.log("Ошибка регистрации");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <input {...register("email")} type="email" placeholder="Email" required className="border p-2" />
            <input {...register("password")} type="password" placeholder="Пароль" required className="border p-2" />
            <input {...register("firstName")} type="text" placeholder="Имя" required className="border p-2" />
            <input {...register("lastName")} type="text" placeholder="Фамилия" required className="border p-2" />
            <select {...register("profile_type")} required className="border p-2">
                <option value="employer">Работодатель</option>
                <option value="job_seeker">Соискатель</option>
            </select>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border p-2"
            />
            <button type="submit" disabled={mutation.isPending}>Зарегистрироваться</button>
        </form>
    );
}