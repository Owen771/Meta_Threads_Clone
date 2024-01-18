// Operation/func related to user
"use server"

import { revalidatePath } from 'next/cache';
import User from '../models/user.model';
import { connectToDB } from "../mongoose"
import Thread from '../models/thread.model';

interface Params {
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string, 
}

// Note: is there a way to avoid calling connectToDB() on every method?
export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path,
}: Params): Promise<void> {
    connectToDB();

    try {
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
            // Make sure the change happen immediately
            //   - revalidate data assoicated with a specific path, useful where u wanna update 
            //      the cached data without waiting for a revalidation period to expire
            revalidatePath(path)
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`)
    }
}

export async function fetchUser(userId : string) {
    try {
        connectToDB();

        return await User
            .findOne({ id: userId })
            // .populate({
            //     path: 'communities',
            //     model: Community
            // })

    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`)
    }
}

// Current use case: 
//  Fetch Threads for a profile, 
//  and only fetching Threads that only belong to a specific user 
export async function fetchUserPosts(userId: string) {
    try {
      connectToDB();

      // TODO: populate community 
      // Find all Threads authored by user with the given userId
      const threads = await User.findOne({ id: userId })
        .populate({
            path: 'threads',
            model: Thread,
            populate: {
                path: 'children',
                model: Thread,
                populate: {
                    path: 'author',
                    model: User,
                    select: 'name image id'
                }
            }
        })

        return threads;
    } catch (error: any) {
        throw new Error(`Failed to fetch user posts: ${error.message}`)
    }
}