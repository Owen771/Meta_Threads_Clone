import * as z from 'zod';

export const ThreadValidation = z.object({
    thread: z.string().nonempty().min(3, { message: 'Minimum 3 char'}),
    accountId: z.string(),
})

// Every comment is a thread of its own
export const CommentValidation = z.object({
    thread: z.string().nonempty().min(3, { message: 'Minimum 3 char'}),
})