import { trpc } from "@/utils/trpc"

// export const useFetchUser = () => {
//     const { data, isLoading, error } = trpc.getUsers.useQuery({
//         limit: 10,
//         page: 1,
//     })
//     return { data, isLoading, error }
// }


export const useFetchUser = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = trpc.getUsers.useInfiniteQuery(
        {
            limit: 10,
        },
        {
            // @ts-ignore
            getNextPageParam: (lastPage: number) => lastPage.nextCursor ? Number(lastPage.nextCursor) : undefined,
        }
    );

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    };
};
