const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const savednNewsSchema = new Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
            unique: true,
            required: true
        },
        news: [
            {
                title: String,
                url: String,
                image: String,
                snippet: String,
                source: String,
                lastUpdated: String
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.models.SavedNews ||  mongoose.model("SavedNews", savednNewsSchema);