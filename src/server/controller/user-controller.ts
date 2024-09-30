import prisma from '@/prisma/prisma-client';
import { TRPCError } from "@trpc/server";
import { CreateUserInput, filterQuery, filterQueryrInput } from "../schema/user-schema";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
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
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new TRPCError({
                code: 'CONFLICT',
                message: 'Email is already in use',
            });
        }

        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Something went wrong, please try again later',
        });
    }
}

// export const getUsersHandler = async ({ filterQuery }: {
//     filterQuery: filterQueryrInput
// }) => {
//     try {
//         const { limit, page } = filterQuery;
//         const take = limit || 10;
//         const skip = (page - 1) * limit;

//         const users = await prisma.user.findMany({
//             skip,
//             take
//         })

//         // get total count users
//         const totalUsers = await prisma.user.count()
//         const totalPages = Math.ceil(totalUsers / take);
//         const hasNextPage = page < totalPages

//         return {
//             status: true,
//             results: users.length,
//             data: {
//                 users,
//                 hasNextPage,
//                 nextPage: hasNextPage ? page + 1 : null
//             }
//         };
//     } catch (error: any) {
//         throw new TRPCError({
//             code: 'INTERNAL_SERVER_ERROR',
//             message: error.message
//         })
//     }
// }

export const getUsersHandler = async ({ filterQuery }: { filterQuery: any }) => {
    try {
        const { cursor, limit } = filterQuery;

        const users = await prisma.user.findMany({
            take: limit + 1,
            skip: 0,
            cursor: cursor ? { id: Number(cursor) } : undefined,
            orderBy: { id: 'asc' }
        })

        let nextCursor: typeof cursor | undefined = undefined;
        if (users.length > limit) {
            const nextUser = users.pop()

            nextCursor = nextUser!.id
        }


        return {
            users,
            nextCursor
        }
    }
    catch (err: any) {
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: err.message
        })
    }


}