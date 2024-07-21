const User = require("../models/User");

exports.myProfile = (req,res) =>{
    res.status(200).json(req.user);
};

exports.logOut = (req,res,next) => {
    req.session.destroy((err)=>{
        if(err){
            next(err);
        }
        else{
            res.clearCookie("connect.sid");
            res.status(200).json({
                message: "Logged Out.",
            })
        }
    })
};

exports.isAuthenticated = (req,res,next) => {
    const token = req.cookies["connect.sid"];
    console.log(token);
    //console.log(JSON.stringify(req.user));
    if(!token){
        console.log("not logged in");
        return res.status(401).json({
            message: "Not Logged In",
        })
    }
    else{
        next();
    }
};


exports.getUserById = (req,res) => {
    User.findById(req.body.userId, (err,doc) => {
        if(err){
            console.log(err);
        }
        else{
            res.json(doc);
        }
    })
}


exports.getAllUsers = (req,res) => {
    User.find().exec((err,users) => {
        if (err) {
            res.status(400).json({
                error: "No users found."
            });
        }
        else {
            res.json(users);
        }
    })
}
