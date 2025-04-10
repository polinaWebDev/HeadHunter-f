import {companyControllerGetCompany} from "@/lib/client";

export const getCompanyById = async (id: number) => {
    const { data } = await companyControllerGetCompany({
        path: { companyId: id }
    });

    return data;
};