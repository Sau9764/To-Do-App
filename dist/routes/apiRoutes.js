"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var jwt = require("jsonwebtoken");
var db = require("../models");
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var router = express_1.default.Router();
// get All todo List
router.get("/all", authToken, function (req, res) {
    db.Todo.findAll().then(function (todos) { return res.send(todos); });
});
// get By ID
router.get("/find/:id", authToken, function (req, res) {
    db.Todo.findAll({
        where: { id: req.params.id }
    }).then(function (todo) { return res.send(todo); });
});
// Inserting new Route
router.post("/new", authToken, function (req, res) {
    db.Todo.create({
        text: req.body.text
    }).then(function (submittedTodo) { return res.send(submittedTodo); });
});
// delete todo
router.delete('/delete/:id', authToken, function (req, res) {
    db.Todo.destroy({
        where: { id: req.params.id }
    }).then(function () { return res.send("Success"); });
});
// Update 
router.put("/edit", authToken, function (req, res) {
    db.Todo.update({ text: req.body.text }, { where: { id: req.body.id }
    }).then(function () { return res.send("Success"); });
});
// middleware to verify the token
function authToken(req, res, next) {
    var authHeader = req.headers['authorization']; // bearer
    var token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.send("Token not found");
    }
    else {
        jwt.verify(token, config.ACCESS_SECRET, function (err, user) {
            if (err)
                return res.send('Incorrect Token' + err);
            next();
        });
    }
}
module.exports = router;
