'use client';

import { useGetCompanyById } from "@/lib/hooks/useGetCompanyById";

export default function CompanyPageClient({
          id,
          user,
      }: {
    id: number;
    user: { id: number };
}) {
    const { data: company, isLoading } = useGetCompanyById.useQuery(id);

    if (isLoading) return <h2>Loading</h2>;
    if (!company) return <h1>Error...</h1>;

    const canEdit = company.members.some(
        (member) =>
            member.user.id === user.id &&
            (member.role === "ADMIN" || member.role === "OWNER")
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">{company.name}</h1>
            <p>{company.description}</p>
            {canEdit && <div>можешь редачить</div>}
        </div>
    );
}