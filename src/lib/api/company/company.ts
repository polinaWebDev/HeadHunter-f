import {companyControllerGetMyCompany} from "@/lib/client";

export const companyApi = async () => {
    const {data} = await companyControllerGetMyCompany()
    if (!data) {
        throw new Error('Ошибка при получении компании');
    }
    console.log('data', data);
    return data;
}