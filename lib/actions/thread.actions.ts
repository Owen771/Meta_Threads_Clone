// Operation/func related to Thread
"use server";

import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();

    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });

    // Update user model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating thread: ${error.message}`);
  }
}

export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // Calculate the number of posts to skip (which page we're on)
  const skipAmount = (pageNumber - 1) * pageSize;

  // Fetch threads(posts) that have no parent (top-level threads)
  const threadsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" }) // newest one will show first
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalThreadsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const threads = await threadsQuery.exec();

  const hasNextPage = totalThreadsCount > skipAmount + threads.length;

  return { threads, hasNextPage };
}

export async function fetchThreadById(id: string) {
  connectToDB();

  try {
    // TODO: Populate Community
    const thread = await Thread.findById(id)
      .populate({
        path: 'author',
        model: User,
        select: "_id id name image"
      })
      .populate({ // Original thread's comments
        path: 'children',
        populate: [
          { // Who made this comment
            path: 'author',
            model: User,
            select: "_id id name parentId image"
          },
          { // The comment
            path: 'children',
            model: Thread,
            populate: {
              path: 'author',
              model: User,
              select: "_id id name parentId image"
            } 
          }

        ]
      }).exec();

      return thread;
  } catch (error: any) {
    throw new Error(`Error fetching thread by id: ${error.message}`);
  }
}

// As comment is also a thread, so this method will be placed here
export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string,
) {
  connectToDB(); 

  try {
    // Find the original thread by its ID
    const originalThread = await Thread.findById(threadId);
    if (!originalThread) throw new Error("Original thread not found"); 

    // Create a new thread with the comment text
    const commentThread = new Thread({
      text: commentText,
      author: userId, 
      parentId: threadId,
    })
    
    // save to DB
    const saveCommentThread = await commentThread.save();
    console.log(saveCommentThread);
    originalThread.children.push(saveCommentThread._id);

    await originalThread.save();
    
    revalidatePath(path); 
  } catch (error: any) {
    throw new Error(`Error adding comment to thread: ${error.message}`);
  }
}