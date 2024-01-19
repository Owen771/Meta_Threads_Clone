import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
    id: { type: String, required: true},
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true},
    image: String,
    bio: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Thread'
        }
    ],
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

// For the first time, mongoose.models.User doesn't exist, 
// so the second half is creating a model "User" in the DB
const Community = mongoose.models.Community || mongoose.model('User', communitySchema);

export default Community;