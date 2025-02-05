import {useAtom} from "jotai/index";
import {authTokenAtom, userIdAtom} from "./state/authAtom.ts";
import {useNavigate} from "@tanstack/react-router";


export const useLogout = () => {
    const [ , setAuthToken] = useAtom(authTokenAtom);
    const [, setUserId] = useAtom(userIdAtom);
    const navigate = useNavigate();

    const logout =  () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        setAuthToken(null);
        setUserId(null);

        navigate({to: "/"});
    };

    return logout;
}