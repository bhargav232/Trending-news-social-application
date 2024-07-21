require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectPassport } = require("./config/passport");
const passport = require('passport');

//Route imports
const newsRoutes = require("./routes/news");
const userRoutes = require("./routes/user");
const prefrenceRoutes = require("./routes/prefrences");
const socialRoutes = require("./routes/social");

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database ')
}).catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
})

//using Middlewares
app.use(session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));

connectPassport();
app.use("/api", newsRoutes);
app.use("/api", userRoutes);
app.use("/api", prefrenceRoutes);
app.use("/api", socialRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`app is running at ${port}....`)
});
