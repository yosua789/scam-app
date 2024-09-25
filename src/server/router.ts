import * as trpc from "@trpc/server";
import { z } from "zod"
import { Context } from "./context";

export const serverRouter = trpc
    .router<Context>().query("findAll", {
        resolve: async ({ ctx }) => {
            return await ctx.prisma.groceryList.findMany()
        }
    })