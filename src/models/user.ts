import {z} from "zod";

export const HalfUser = z.object({
    username: z.string(),
    nickname: z.string().nullable(),
    password: z.string(),
    birthday: z.string().nullable().transform(str => str ? new Date(str): null),
    email: z.string().email().nullable(),
    phone: z.string().nullable(),
    address: z.string().nullable()
}).strict();

export const User = HalfUser.extend({
    user_id: z.string(),
    createdAt: z.string().transform(str => new Date(str)),
    updatedAt: z.string().transform(str => new Date(str))
}).strict();

export type UserType = z.infer<typeof User>;

export type HalfUserType = z.infer<typeof HalfUser>;
