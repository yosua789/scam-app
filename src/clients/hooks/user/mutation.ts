import { trpc } from "@/utils/trpc";
import queryClient from "@/utils/query-client";
import { CreateUserInput } from "@/server/schema/user-schema";

export const useUserMutation = () => {
    const { mutate, error } = trpc.createUser.useMutation({
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: [["getUsers"], { input: { limit: 10, page: 1 }, type: "query" }],
            });
        },
    });

    const createUser = (data: CreateUserInput) => {
        mutate(data);
    };

    return { createUser, error };
};
