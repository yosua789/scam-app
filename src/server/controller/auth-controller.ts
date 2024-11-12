import prisma from '@/prisma/prisma-client';
import { TRPCError } from '@trpc/server';
import { hash } from "argon2";
import { Ilogin, IRegister } from '../schema/auth/auth-schema';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';


export const loginHandler = async ({ input }: Record<string, Ilogin>) => {
    try {
        const data = await prisma.user.findUnique({
            where: { email: input.email }
        });
        const secret = process.env.JWT_SECRET!;
        if (data) {
            if (data.password !== input.password) {
                throw new TRPCError({
                    code: 'CONFLICT',
                    message: 'Wrong email or password',
                });
            }
            // const token = jwt.sign({ sub: data?.email }, secret, {
            //     expiresIn: 60 * 60
            // })
            // const cookieOptions = {
            //     httpOnly: true,
            //     path: '/',
            //     secure: process.env.NODE_ENV !== 'development',
            //     maxAge: 60 * 60,
            // };
            // cookies().set('token', token, cookieOptions)
            return {
                status: true,
                data,
                // token
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


export const logoutHandler = async () => {
    try {
        cookies().set('token', '', {
            maxAge: -1
        })
        return {
            status: true
        }
    } catch (error) {
        throw error;
    }
}