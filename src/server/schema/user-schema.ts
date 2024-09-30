import { TypeOf, number, object, string } from "zod"
import { EMPTY_MESSAGE, INVALID_EMAIL_MESSAGE } from "./util/constant"
export const createUserSchema = object({
    name: string({ required_error: `Name ${EMPTY_MESSAGE}` }).min(1, "Min 1 Char"),
    email: string({ required_error: `Email ${EMPTY_MESSAGE}` }).email(`${INVALID_EMAIL_MESSAGE}`),
})

export const filterQuery = object({
    limit: number().min(1).max(100).default(10),
    page: number().min(1).default(1),
    cursor: number().optional()
})

export type CreateUserInput = TypeOf<typeof createUserSchema>
export type filterQueryrInput = TypeOf<typeof filterQuery>