import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    id: { type: String, required: true},
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true},
    image: String,
    bio: String,
    onboarded: {
        type: Boolean,
        default: false
    },

    // An user can have multiple ref to specific threads stored in DB
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Thread'
        }
    ],

    // An user can belong to many communities
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community'
        }
    ]
});

// For the first time, mongoose.models.User doesn't exist, 
// so the second half is creating a model "User" in the DB
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;