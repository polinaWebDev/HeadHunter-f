import {loginApi} from "../api/auth/login";
import {MutationWrapper} from "../help/MutationWrapper";

export const useLoginMutation = new MutationWrapper({
    mutationFn: loginApi,
});