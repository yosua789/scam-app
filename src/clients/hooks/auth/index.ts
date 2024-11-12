import { useToast } from "@/hooks/use-toast"
import { Ilogin, loginSchema } from "@/server/schema/auth/auth-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useLoginMutation } from "./mutation"
import { useRouter } from "next/navigation"

export const useLoginUser = () => {

    const router = useRouter()
    const defaultValues = {
        email: '',
        password: ''
    }
    const form = useForm<Ilogin>({
        resolver: zodResolver(loginSchema),
        defaultValues
    })

    const { toast } = useToast()
    const { loginUser, error: serverError } = useLoginMutation()

    const onSubmit = async (data: Ilogin) => {
        try {
            await loginUser(data)
            toast({
                variant: 'success',
                title: 'Success',
                description: 'Berhasil masuk gan'
            })
            form.reset();
            router.push('/dashboard/user')

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "There was an issue login.",
            });
        }
    }          

    return {
        form,
        handleSubmit: form.handleSubmit(onSubmit),
        serverError,

    }
}