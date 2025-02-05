import {useState} from "react";
import {useLogin} from "../../../viewmodels/useLogin.ts";
import {useNavigate} from "@tanstack/react-router";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {mutate, isPending,error} = useLogin()
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        mutate({email, password}, {
            onSuccess: () => {
                navigate({to: "/"}) //Todo: почитай другие параметры хука UseNavigate
            },
            onError: (err) => {
                console.log(err);
            }
        })
    }

    return (
        <div>
            <h1>Вход</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={isPending}>
                    {isPending ? "Загрузка..." : "Войти"}
                </button>
            </form>
            {error && <p>Ошибка: {error.message} </p>}
        </div>
    );
}

export default LoginScreen;