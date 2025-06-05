import {z} from "zod";


export const UserToken = z.object({
    token_id: z.string().length(36, 'User Token ID must be 36 characters long'),
    user_id: z.string().length(36, 'User ID must be 36 characters long'),
    admin_id: z.string().length(36, 'Admin ID must be 36 characters long'),
    token: z.string().length(64, 'Token must be 64 characters long'),
    created_at: z.string().transform(str => new Date(str)),
    expired_at: z.string().transform(str => new Date(str))
}).strict();

export type UserTokenType = z.infer<typeof UserToken>;