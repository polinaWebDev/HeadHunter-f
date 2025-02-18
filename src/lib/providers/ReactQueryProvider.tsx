"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import {queryClient} from "../help/queryClient";

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
    console.log("🔄 ReactQueryProvider is mounting");



    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}