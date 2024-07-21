const Social = require("../models/Social");
const User = require("../models/user");


exports.followUser = (req,res) => {
        try{
            Social.findOneAndUpdate(
                {user: req.body.userId},
                {
                    $push:{
                        following: req.body.userIdToFollow
                    }
                },
                {
                    new:true,
                    upsert:true
                },
                (err,doc) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.json(doc)
                    }
                }
            )
        }
        catch(error){
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

exports.getFollowing = (req,res) => {
    try{
        Social.findOne(
            {
                user: req.body.userId,
                following: {$all :[req.body.followingId]}
            },
            (err, doc) => {
                if (err) {
                    res.json(err)
                }
                res.json(doc)
            }
        )

    }
    catch(error){
        console.log(error);
    }
}

exports.getFollowingById = (req,res) => {
    try{
        
        Social.findOne({
            user: req.body.userId,
        },
        (err, doc) => {
            if (err) {
                res.json(err)
            }
            res.json(doc)
        }
        )
    }
    catch(error){
        console.log(error);
    }
}