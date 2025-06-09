import {z} from "zod";


export const HalfUser = z.object({
    admin_id: z.string()
        .length(36, 'Admin ID must be 36 characters long'),
    username: z.string()
        .max(100, 'Username must be at most 100 characters long')
        .min(1, 'Username must be at least 1 character long'),
    nickname: z.string()
        .max(25, 'Nickname must be at most 25 characters long')
        .min(1, 'Nickname must be at least 1 character long')
        .nullable().optional().transform(val => val ?? null),
    password: z.string()
        .max(255, 'Password must be at most 255 characters long')
        .min(8, 'Password must be at least 8 characters long'),
    birthday: z.string()
        .date()
        .nullable().optional().transform(str => str ? new Date(str): null),
    email: z.string()
        .email()
        .nullable().optional().transform(val => val ?? null),
    phone: z.string()
        .max(16, 'Phone number must be at most 16 characters long')
        .nullable().optional().transform(val => val ?? null),
    address: z.string()
        .max(160, 'Address number must be at most 160 characters long')
        .min(6, 'Address must be at least 1 characters long')
        .nullable().optional().transform(val => val ?? null)
}).strict();

export const User = HalfUser.extend({
    user_id: z.string().length(36, 'User ID must be 36 characters long'),
    created_at: z.string().transform(str => new Date(str)),
    updated_at: z.string().transform(str => new Date(str))
}).strict();

export type UserType = z.infer<typeof User>;

export type HalfUserType = z.infer<typeof HalfUser>;
