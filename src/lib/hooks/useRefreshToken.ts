import {MutationWrapper} from "../help/MutationWrapper";
import {refreshTokenApi} from "../api/auth/refresh-token";

export const useRefreshToken = new MutationWrapper({
    mutationFn: refreshTokenApi,
})