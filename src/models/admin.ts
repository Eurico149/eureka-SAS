import {z} from "zod";


export const HalfAdmin = z.object({
    username: z.string(),
    password: z.string()
}).strict();

export const Admin = HalfAdmin.extend({
    admin_id: z.string(),
    createdAt: z.string().transform(str => new Date(str)),
    updatedAt: z.string().transform(str => new Date(str))
}).strict();

export type AdminType = z.infer<typeof Admin>;

export type HalfAdminType = z.infer<typeof HalfAdmin>;
