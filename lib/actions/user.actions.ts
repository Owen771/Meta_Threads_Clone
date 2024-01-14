"use server"

import { revalidatePath } from 'next/cache';
import User from '../models/user.model';
import { connectToDB } from "../mongoose"

export async function updateUser(
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string,
): Promise<void> {
    connectToDB();

    await User.findOneAndUpdate(
        { id: userId, },
        {
            username: username.toLowerCase(), 
            name,
            bio,
            image,
            onboarded: true,
        }, 
        { upsert: true } // combination of update and insert (update if exist, otherwise insert)
    );

    if (path == '/profile/edit') {
        revalidatePath(path);
    }
}