// src/state/authAtom.ts
import { atom } from 'jotai';

const storedUserId = localStorage.getItem('userId');
const storedToken = localStorage.getItem('token');

// Атом для хранения токена авторизации
export const authTokenAtom = atom<string | null>(storedToken);

// Атом для хранения состояния авторизации (например, true/false)
export const isAuthenticatedAtom = atom((get) => !!get(authTokenAtom)); // Если токен есть, то авторизован

export const userIdAtom = atom<number | null>(storedUserId ? Number(storedUserId) : null);