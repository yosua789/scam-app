import prisma from '@/prisma/prisma-client';
import { TRPCError } from "@trpc/server";
import { CreateUserInput, filterQueryrInput } from "../schema/user-schema";
interface IUserController {
    input: CreateUserInput
}

export const createUserHandler = async ({ input }: IUserController) => {
    try {
        const user = await prisma.user.create({
            data: input
        })
        return {
            status: true,
            data: {
                user
            }
        }

    } catch (error: any) {
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: error.message
        })
    }
}

export const getUsersHandler = async ({ filterQuery }: {
    filterQuery: filterQueryrInput
}) => {
    try {
        const { limit, page } = filterQuery;
        const take = limit || 10;
        const skip = (page - 1) * limit;

        const users = await prisma.user.findMany({
            skip,
            take
        })

        return {
            status: true,
            results: users.length,
            data: {
                users,
            },
        };
    } catch (error: any) {
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: error.message
        })
    }
}