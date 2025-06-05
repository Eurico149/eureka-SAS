import {z} from "zod";


export const HalfAdmin = z.object({
    username: z.string().max(100, 'Username Is too Large').min(1, 'Username Is too Short'),
    password: z.string().max(256, 'Password Is too Large').min(8, 'Password Is too Short'),
    email: z.string().email().nullable(),
    phone: z.string().max(16, 'Phone Number Is too Large').nullable(),
}).strict();

export const Admin = HalfAdmin.extend({
    admin_id: z.string(),
    created_at: z.string().transform(str => new Date(str)),
    updated_at: z.string().transform(str => new Date(str))
}).strict();

export type AdminType = z.infer<typeof Admin>;

export type HalfAdminType = z.infer<typeof HalfAdmin>;
