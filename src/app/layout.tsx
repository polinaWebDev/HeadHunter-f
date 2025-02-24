"use client"

import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "../lib/help/queryClient";
import ClientProvider from "../lib/providers/ClientProvider";



export default function RootLayout({ children }: { children: React.ReactNode }) {



    return (
        <html lang="en">
        <body>
        <QueryClientProvider client={queryClient}>
            <ClientProvider>
                {children}
            </ClientProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        </body>
        </html>
    );
}