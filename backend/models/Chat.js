const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const chatSchema = new Schema(
    {
        sender: {
            type: ObjectId,
            ref: "User",
            unique: true,
            required: true
        },
        receiver: {
            type: ObjectId,
            ref: "User",
            unique: true,
            required: true
        },
        message: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.models.Chat ||  mongoose.model("Chat", chatSchema);