import { registerApi} from "../api/auth";
import {MutationWrapper} from "../help/MutationWrapper";
import {client} from "../client/client.gen";

export const registerMutation = new MutationWrapper({
    mutationFn: registerApi,
    client: client
})

