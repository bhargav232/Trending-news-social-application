const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const{ObjectId} = mongoose.Schema.Types;

const prefrencesSchema = new Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
            unique: true,
            required: true
        },
        location:{
            type: String,
            required: true,
        },
        prefrence1:{
            type: String,
            required: true,
        },
        prefrence2:{
            type: String,
            required: true,
        },
        prefrence3:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.models.Prefrences || mongoose.model("Prefrences", prefrencesSchema);