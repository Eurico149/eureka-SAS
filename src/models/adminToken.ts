import {z} from "zod";


export const AdminToken = z.object({
    admin_id: z.string().length(36, 'Admin ID must be 36 characters long'),
    token: z.string().length(64, 'Token must be 64 characters long'),
    createdAt: z.string().transform(str => new Date(str)),
    expired_at: z.string().transform(str => new Date(str))
}).strict();

export type AdminTokenType = z.infer<typeof AdminToken>;

