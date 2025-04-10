"use server";

import MyCompanies from "@/app/company/MyCompanies";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {companyApi} from "@/lib/api/company/company";

export default async function CompanyScreen () {

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['myCompanies'],
        queryFn: companyApi
    });


    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <MyCompanies/>
            </HydrationBoundary>
        </>
    )
}