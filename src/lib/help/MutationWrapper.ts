import { useMutation, UseMutationResult, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export class MutationWrapper<Return, Args> {
    mutationFn: (x: Args) => Promise<Return>;
    options?: UseMutationOptions<Return, AxiosError, Args, unknown>;

    constructor(data: {
        mutationFn: (x: Args) => Promise<Return>;
        client?: any;
        options?: UseMutationOptions<Return, AxiosError, Args, unknown>;
    }) {
        this.mutationFn = data.mutationFn;
        this.options = data.options;
    }

    useMutation(): UseMutationResult<Return, AxiosError, Args, unknown> {
        return useMutation({
            mutationFn: this.mutationFn,
            ...this.options,
        });
    }

    mutateAsynch = async (args: Args) => {
        return this.mutationFn(args);
    };

}