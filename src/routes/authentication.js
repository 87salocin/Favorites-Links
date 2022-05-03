const express = require("express");
const { redirect } = require("express/lib/response");
const  router = express.Router();
const passport = require("passport")
const { isLoggedIn, isNotloggedIn } = require("../lib/out")

router.get("/signup", isNotloggedIn, (req,res) => {
    res.render("out/signup")
});

router.post("/signup", isNotloggedIn, passport.authenticate("local.signup", {
        successRedirect: "/profile",
        failureRedirect: "/signup",
        failureFlash: true
}))

router.get("/signin", isNotloggedIn, (req, res) => {
        res.render("out/signin");
});

router.post("/signin", isNotloggedIn, (req, res, next) => {
        passport.authenticate("local.signin", {
                successRedirect:"/profile",
                failureRedirect:"/signin",
                failureFlash: true
        })(req, res, next)
})

router.get("/profile", isLoggedIn,(req, res) => {
        res.render("profile");
});

router.get("/logout", isLoggedIn,(req, res) => {
        req.logOut();
        res.redirect("/signin");

});

module.exports = router;