import { t } from "@/utils/trpc-server";
import { loginSchema, registerSchema } from "../schema/auth/auth-schema";
import { loginHandler, registerHandler } from "../controller/auth-controller";

const authRouter = t.router({
    registerUser: t.procedure.input(registerSchema).mutation(({ input }) => registerHandler({ input })),
    loginUser: t.procedure.input(loginSchema).mutation(({ input }) => loginHandler({ input }))
})

export default authRouter;