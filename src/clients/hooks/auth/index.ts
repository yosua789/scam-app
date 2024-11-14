import { useToast } from "@/hooks/use-toast"
import { Ilogin, IRegister, loginSchema, registerSchema } from "@/server/schema/auth/auth-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useLoginMutation, useRegisterMutation } from "./mutation"
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

export const useRegisterUser = () => {

    const router = useRouter()
    const defaultValues = {
        email: '',
        password: '',
        c_password: '',
        name: ''
    }
    const form = useForm<IRegister>({
        resolver: zodResolver(registerSchema),
        defaultValues
    })

    const { toast } = useToast()
    const { registerUser, error: serverError } = useRegisterMutation()

    const onSubmit = async (data: IRegister) => {
        try {
            await registerUser(data)
            toast({
                variant: 'success',
                title: 'Success',
                description: 'berhasil register gan'
            })
            form.reset();
            router.push('/sign-in')

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "There was an issue register gan.",
            });
        }
    }

    return {
        form,
        handleSubmit: form.handleSubmit(onSubmit),
        serverError,

    }
}