"use client";

import {useGetMyCompanies} from "@/lib/hooks/useGetMyCompanies";
import Link from "next/link";

export default function MyCompanies() {
    const { data } = useGetMyCompanies.useQuery({});

    return (
        <>
            {data?.map((company) => (
                <div key={company.id}>
                    <Link href={`/company/${company.id}`}>
                        <h2>{company.name}</h2>
                        <p>{company.description}</p>
                    </Link>
                </div>
            ))}
        </>
    )

}