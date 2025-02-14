import {UndefinedInitialDataOptions, useQuery} from "@tanstack/react-query";

interface ApiQueryProps<Return, Args > {
    key: string;
    req: (x: Args) => Promise<Return>;
    keyGen?: (key: string, x: Args) => string[]
    staleTime?: number
}

export const useApiQuery = <Return, Args>({
      key,
      req,
      keyGen = (key) => [key],
      staleTime = 60 * 1000,
  }: ApiQueryProps<Return, Args>) => {
    return (x: Args, options?: Partial<UndefinedInitialDataOptions<Return, Error, Return, string[]>>) =>
        useQuery({
            queryKey: keyGen(key, x),
            queryFn: () => req(x),
            staleTime,
            ...options,
        });
};