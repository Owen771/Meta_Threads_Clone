import * as z from 'zod';

export const UserValidation = z.object({
    // Ensure profile_photo is string, and url type, and non empty
    profile_photo: z.string().url().nonempty(),

    // Optional min can add a descrption
    name: z.string().min(3, { message: 'Minimum 3 char'}).max(30),
    username: z.string().min(3).max(30),
    bio: z.string().min(3).max(1000),
})