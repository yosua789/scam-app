import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserInput, createUserSchema } from "@/server/schema/user-schema";
import { useUserMutation } from "./mutation";
import { useToast } from "@/hooks/use-toast";

// Mutation
export const useUserCreate = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema)
    })

    const { toast } = useToast()
    const { createUser, error: serverError } = useUserMutation()

    const onSubmit = async (data: CreateUserInput) => {
        try {
            await createUser(data)
            toast({
                variant: "success",
                title: "Success",
                description: `Data berhasil disimpan sementara`,
            });
            reset();
        }
        catch (err) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "There was an issue submitting the form.",
            });
        }
    }


    return { register, handleSubmit: handleSubmit(onSubmit), errors, serverError }
}