import {QueryWrapper} from "@/lib/help/QueryWrapper";
import {companyApi} from "@/lib/api/company/company";


export const useGetMyCompanies = new QueryWrapper({
    key: "myCompanies",
    reqFn: companyApi,
})