import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "./router";
import {client} from "./client/gen/client.gen.ts";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60000,
        },
    },
});

client.setConfig({
    // set default base url for requests
    baseURL: 'http://localhost:3000/static/openapi.json',
    // set default headers for requests
    headers: {
        Authorization: 'Bearer <token_from_service_client>',
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AppRouter />
        </QueryClientProvider>
    </React.StrictMode>
);