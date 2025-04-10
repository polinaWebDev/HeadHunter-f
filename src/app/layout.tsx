import {QueryProvider} from "@/lib/providers/query-provider";
import Header from "@/components/Layout/Header/Header";
import {UserGuard} from "@/lib/help/UserGuard";



export default function RootLayout({ children }: { children: React.ReactNode }) {



    return (
        <html lang="en">
        <body>
            <QueryProvider>
                <UserGuard>
                    <Header/>
                    {children}
                </UserGuard>
            </QueryProvider>
        </body>
        </html>
    );
}