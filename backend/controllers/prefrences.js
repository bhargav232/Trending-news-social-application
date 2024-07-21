const Prefrences = require("../models/Prefrences");



exports.updatePrefrences = (req,res) => {
    try{
        Prefrences.findOneAndUpdate(
            {user: req.body.userId},
            {$set:{
                location: req.body.location,
                prefrence1: req.body.prefrence1,
                prefrence2: req.body.prefrence2,
                prefrence3: req.body.prefrence3
            }},
            {
                new: true,
                upsert: true
            },
            (err,doc) => {
                if(err){
                    res.json(err);
                    console.log(err);
                }
                res.json(doc)
            }
        );
    }
    catch(error){
        console.log(error);
    }
}

exports.getPrefrences = (req,res) => {
    Prefrences.findOne(
        {user: req.body.userId},
        (err, doc) => {
            if (err) {
                res.json(err);
                console.log(err);
            }
            res.json(doc)
        }
    )
}