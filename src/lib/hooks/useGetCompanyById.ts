import {QueryWrapper} from "@/lib/help/QueryWrapper";
import {getCompanyById} from "@/lib/api/company/getCompanyById";

export const useGetCompanyById = new QueryWrapper({
    key: "companyById",
    reqFn: getCompanyById,
});