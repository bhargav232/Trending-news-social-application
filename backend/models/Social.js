const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const socialSchema = new Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
            unique: true,
            required: true
        },
        friends: [
            {
                type: ObjectId,
                ref: "User"
            },
        ],
        followers: [
            {
                type: ObjectId,
                ref: "User"
            },
        ],
        following: [
            {
                type: ObjectId,
                ref: "User"
            },
        ],
        blocked: [
            {
                type: ObjectId,
                ref: "User"
            },
        ],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.models.Social ||  mongoose.model("Social", socialSchema);