import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const threadSchema = new mongoose.Schema({
    text: { type: String, required: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
    },
    createdAt: { type: Date, default: Date.now },
    parentId: { type: String },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
             
            // ref to itself, as comment is also a thread, as well as people can comment a comment 
            ref: 'Thread'
        }
    ]
});

// For the first time, mongoose.models.Thread doesn't exist, 
// so the second half is creating a model "Thread" in the DB
const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema);

export default Thread;