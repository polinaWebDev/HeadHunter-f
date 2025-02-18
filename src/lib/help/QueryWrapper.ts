import {queryClient} from "./queryClient";
import {UndefinedInitialDataOptions, useQuery} from "@tanstack/react-query";


export class QueryWrapper<Return, Args> {
    key: string;
    reqFn: (x: Args) => Promise<Return>;
    staleTime = 60*1000;
    retry = 1


    keyGen: (key: string, x: Args) => string[] = (key) => [key]

    constructor(data: {
        key: string;
        reqFn: (x: Args) => Promise<Return>;
        keyGen?: (key: string, x:Args) => string[];
        staleTime?: number;
        retry?: number;
    }) {
        this.key = data.key;
        this.reqFn = data.reqFn;
        this.keyGen = data.keyGen || this.keyGen;
        this.staleTime = data.staleTime || this.staleTime;
        this.retry = data.retry || this.retry
    }

    
    useQuery = (x:Args, options?: Partial<UndefinedInitialDataOptions<Return, Error, Return, unknown[]>>) => {
        useQuery({
            queryKey: this.keyGen(this.key, x),
            queryFn: () => this.reqFn(x),
            retry: this.retry,
            ...options,
        })
    }

    async prefetch(x: Args) {
        const data = await this.reqFn(x);
        await queryClient.prefetchQuery({
            queryKey: this.keyGen(this.key, x),
            queryFn: () => data,
            staleTime: this.staleTime,
            retry: this.retry,
        })

        return data
    }

    refetch(x?: Args) {
        if(!x) {
            return queryClient.refetchQueries({ queryKey: [this.key] });
        }

        return queryClient.refetchQueries({
            queryKey: this.keyGen(this.key, x),
        })
    }

    reset(x?: Args) {
        if (!x) {
            return queryClient.resetQueries({ queryKey: [this.key] });
        }

        return queryClient.resetQueries({
            queryKey: this.keyGen(this.key, x),
        })
    }
}

