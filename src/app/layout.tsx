"use client"

import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "../lib/help/queryClient";
import {useGetUser} from "../lib/hooks/useGetUser";
import {useEffect} from "react";



export default function RootLayout({ children }: { children: React.ReactNode }) {

    const getUser = useGetUser();

    useEffect(() => {
        getUser();
    }, [getUser]);


    return (
        <html lang="en">
        <body>
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        </body>
        </html>
    );
}