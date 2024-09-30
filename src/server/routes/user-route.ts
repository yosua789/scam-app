import { t } from "@/utils/trpc-server";
import { createUserSchema, filterQuery } from "../schema/user-schema";
import { createUserHandler, getUsersHandler } from "../controller/user-controller";


const userRouter = t.router({
    createUser: t.procedure.input(createUserSchema).mutation(({ input }) => createUserHandler({ input })),
    getUsers: t.procedure.input(filterQuery).query(({ input }) => getUsersHandler({ filterQuery: input })),
})

export default userRouter;