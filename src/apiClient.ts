import {CreateClientConfig} from "./client/client.gen";


export const createClientConfig: CreateClientConfig = (config) => ({
    ...config,
    withCredentials: true,
});