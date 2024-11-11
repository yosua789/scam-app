import { trpc } from "@/utils/trpc"

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
        data: data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    };
};
