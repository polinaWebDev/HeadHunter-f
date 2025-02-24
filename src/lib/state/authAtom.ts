import {atom, useAtom} from "jotai";



export const authAtom = atom<string | null>(null);

export const useAuth = () => useAtom(authAtom)