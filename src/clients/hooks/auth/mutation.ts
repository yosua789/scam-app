import { Ilogin } from "@/server/schema/auth/auth-schema";
import { trpc } from "@/utils/trpc"



export const useLoginMutation = () => {
    const { mutateAsync, error } = trpc.loginUser.useMutation({
        onSettled: () => {
        },
        onError: (err) => {
            throw err
        }
    });
    const loginUser = async (data: Ilogin) => {
        return await mutateAsync(data)
    }

    return { loginUser, error }
}