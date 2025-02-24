import {MutationWrapper} from "../help/MutationWrapper";
import {client} from "../client/client.gen";
import {registerApi} from "../api/auth/register";

export const useRegisterMutation = new MutationWrapper({
    mutationFn: registerApi,
    client: client
})

