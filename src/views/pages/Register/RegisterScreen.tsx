import {useState} from "react";
import {useRegister} from "../../../viewmodels/useRegister.ts";
import styles from "./styles.module.css";

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profileType, setProfileType] = useState<'employer' | 'job_seeker'>('job_seeker');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const { mutate: authControllerRegister, isPending, isError, isSuccess, error  } = useRegister();

    if (isError) {
        console.log('Registration error:', error);
    }

    if (isSuccess) {
        console.log('Registration successful');
    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAvatarFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Создаем объект FormData для отправки файла
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('profileType', profileType);

        if (avatarFile) {
            formData.append('avatar', avatarFile); // Добавляем файл
        }

        // Передаем formData без body, т.к. формируем multipart запрос
        authControllerRegister(formData);
    };

    return (
        <div className={styles.container}>
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Имя"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Фамилия"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <select value={profileType} onChange={(e) => setProfileType(e.target.value as "job_seeker" | "employer")}>
                    <option value="job_seeker">Соискатель</option>
                    <option value="employer">Работодатель</option>
                </select>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*" // Можно ограничить типы файлов
                />
                <button type="submit" disabled={isPending}>
                    {isPending ? "Регистрация..." : "Зарегистрироваться"}
                </button>
            </form>
        </div>
    );
};

export default RegisterScreen;