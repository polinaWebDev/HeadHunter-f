import {queryClient} from "./queryClient";
import { useQuery, UseQueryOptions} from "@tanstack/react-query";


export class QueryWrapper<Return, Args> {
    key: string;
    reqFn: (x: Args) => Promise<Return>;
    staleTime = 5*60*1000;
    retry = 0;
    gcTime = 5*60*1000;
    refetchOnWindowFocus?: false;
    refetchOnMount?: false;
    options?: UseQueryOptions<Return, Error, Return, unknown[]>;



    keyGen: (key: string, x: Args) => string[] = (key) => [key]

    constructor(data: {
        key: string;
        reqFn: (x: Args) => Promise<Return>;
        keyGen?: (key: string, x:Args) => string[];
        staleTime?: number;
        gcTime?: number;
        retry?: number;
        refetchOnWindowFocus?: false;
        refetchOnMount?: false;
        options?: UseQueryOptions<Return, Error, Return, unknown[]>;
    }) {
        this.key = data.key;
        this.reqFn = data.reqFn;
        this.keyGen = data.keyGen || this.keyGen;
        this.gcTime = data.gcTime || this.gcTime;
        this.staleTime = data.staleTime || this.staleTime;
        this.retry = data.retry || this.retry;
        this.refetchOnWindowFocus = data.refetchOnWindowFocus || this.refetchOnWindowFocus;
        this.refetchOnMount = data.refetchOnMount || this.refetchOnMount
        this.options = data.options || this.options;
    }

    
    useQuery = (x:Args) => {
        return useQuery({
            queryKey: this.keyGen(this.key, x),
            queryFn: () => this.reqFn(x),
            staleTime: this.staleTime,
            retry: this.retry,
            gcTime: this.gcTime,
            refetchOnWindowFocus: this.refetchOnWindowFocus,
            refetchOnMount: this.refetchOnMount,
            ...this.options
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

