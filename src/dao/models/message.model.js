import mongoose from "mongoose";

const msgsCollection = 'Messages';

const messageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
      }
})

const messageModel = mongoose.model(msgsCollection, messageSchema);

export default messageModel