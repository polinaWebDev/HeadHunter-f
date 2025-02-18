import {loginApi} from "../api/auth";
import {MutationWrapper} from "../help/MutationWrapper";

export const loginMutation = new MutationWrapper({
    mutationFn: loginApi,
});