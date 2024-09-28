import { trpc } from "@/utils/trpc"

export const useFetchUser = () => {
    const { data, isLoading, error } = trpc.getUsers.useQuery({
        limit: 10,
        page: 1,
    })
    return { data, isLoading, error }
}