import {CreateClientConfig} from "@hey-api/client-axios";


export const createClientConfig: CreateClientConfig = (config) => ({
    ...config,
    withCredentials: true,
});