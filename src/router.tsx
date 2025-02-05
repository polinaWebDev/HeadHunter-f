import {
    createRouter,
    RouterProvider,
    createRoute,
    createRootRoute
} from "@tanstack/react-router";
import IndexLayout from "./views/layout/IndexLayout.tsx";
import HomeScreen from "./views/pages/HomeScreen.tsx";
import LoginScreen from "./views/pages/Login/LoginScreen.tsx";
import RegisterScreen from "./views/pages/Register/RegisterScreen.tsx";
import {ProfileScreen} from "./views/pages/Profile/ProfileScreen.tsx";


const rootRoute =  createRootRoute({
    component: IndexLayout,
})


const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: HomeScreen,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: LoginScreen,
})

const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/register",
    component: RegisterScreen,
})

const profileRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/profile",
    component: ProfileScreen
})

const routeTree = rootRoute.addChildren([homeRoute, loginRoute, registerRoute, profileRoute,]);

export const router = createRouter({ routeTree });

export function AppRouter() {
    return <RouterProvider router={router} />;
}