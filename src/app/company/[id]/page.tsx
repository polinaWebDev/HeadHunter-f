import {cache, use} from "react";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getCompanyById} from "@/lib/api/company/getCompanyById";
import {getCurrentUser} from "@/lib/help/getCurrentUser";
import CompanyPageClient from "@/app/company/[id]/CompanyPageClient";

const getData = cache(async (id: number) => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["companyById", id],
        queryFn: () => getCompanyById(id),
    });

    return dehydrate(queryClient);
});

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
    const { id } = use(params)
    const user = await getCurrentUser();
    console.log(user);
    if (!user) return <h2>Loading...</h2>;

    const dehydratedState = await getData(id);

    return (
        <HydrationBoundary state={dehydratedState}>
            <CompanyPageClient id={id} user={user} />
        </HydrationBoundary>
    );
}