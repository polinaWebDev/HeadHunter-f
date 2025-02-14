import ReactQueryProvider from "./providers/ReactQueryProvider.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";


export default function RootLayout({ children }: { children: React.ReactNode }) {

    console.log("🖥️ RootLayout is rendering");
    return (
        <html lang="en">
            <body>
                <ReactQueryProvider>
                    {children}
                    <ReactQueryDevtools initialIsOpen={false} />
                </ReactQueryProvider>
            </body>
        </html>
    );
}