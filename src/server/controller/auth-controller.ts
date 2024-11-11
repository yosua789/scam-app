import prisma from '@/prisma/prisma-client';
import { TRPCError } from '@trpc/server';
import { hash } from "argon2";
import { Ilogin, IRegister } from '../schema/auth/auth-schema';


interface ILoginProps {
    email: string;
    password: string;
}


export const loginHandler = async ({ payload }: Record<string, Ilogin>) => {
    try {
        const data = await prisma.user.findFirst({
            where: { email: payload.email }
        });
        if (data) {
            return {
                status: true,
                data: data
            }
        }
    }
    catch (error: any) {
        throw new TRPCError({
            code: 'CONFLICT',
            message: 'error login',
        });
    }

}

export const registerHandler = async ({ payload }: Record<string, IRegister>) => {
    try {
        const { email, password, name } = payload;
        const isEmailExists = await prisma.user.findFirst({
            where: { email }
        })
        if (isEmailExists) {
            throw new TRPCError({
                code: 'CONFLICT',
                message: 'Email is already in use',
            });
        }

        const hashPassword = await hash(password)
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashPassword,
            }
        })
        return {
            status: true,
            message: 'user registered successfully'
        }
    }
    catch (error: any) {
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Something went wrong, please try again later',
        });
    }

}