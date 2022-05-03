const flash = require("connect-flash/lib/flash");
const express = require("express");
const { links } = require("express/lib/response");
const  router = express.Router();

const pool = require("../views/database");
const { isLoggedIn } = require("../lib/out")

router.get("/add", isLoggedIn, (req, res) => {
    res.render("links/add");
});

router.post("/add",isLoggedIn, async (req, res) => {
    const {title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query("INSERT INTO links set ?", [newLink]);
    req.flash("success", "Link agregado satisfactoriamente");
    res.redirect("/links");
});
router.get("/",  isLoggedIn,async (req,res) =>{
    const links = await pool.query("SELECT * FROM links WHERE user_id = ?", [req.user.id]);
    console.log(links);
    res.render("links/list", {links});
});
router.get("/deleted/:id", isLoggedIn, async (req, res) => {
    const {id} = req.params;
    await pool.query("DELETE FROM links WHERE ID = ?", [id]);
    req.flash("success", "eliminado satisfactoriamente")
    res.redirect("/links");
});
router.get("/edit/:id", isLoggedIn, async(req,res) => {
    const {id} = req.params;
    const links = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
    res.render("links/edit", {link: links[0]});
});
router.post("/edit/:id", isLoggedIn, async(req,res) => {
    const {id} = req.params;
    const {title, description, url} = req.body;
    const newLink = {
        title,
        description,
        url
    };
    await pool.query("UPDATE links set ? WHERE id = ?", [newLink,id]);
    req.flash("success", "Link actualizado satisfactoriamente")
    res.redirect("/links")
});

module.exports = router;