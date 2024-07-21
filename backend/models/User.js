const mongoose = require("mongoose");
const{ObjectId} = mongoose.Schema;
var userSchema = new mongoose.Schema(
    {
        googleId:{
            type: String,
            unique: true,
        },
        name: {
            type:String,
            required:true,
        },
        photo:{
            type: String,
        },
        email:{
            type: String,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.models.User || mongoose.model("User",userSchema);

