import {z} from "zod";


export const AdminApiKey = z.object({
    api_key: z.string().length(64, 'Token must be 64 characters long'),
    admin_id: z.string().length(36, 'Admin ID must be 36 characters long'),
    valid: z.boolean().default(true),
    created_at: z.string().transform(str => new Date(str)),
}).strict();

export type AdminApiKeyType = z.infer<typeof AdminApiKey>;
