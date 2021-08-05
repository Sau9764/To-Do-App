"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var db = require("../models");
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var router = express_1.default.Router();
// sign-up user
router.post("/sign-up", function (req, res) {
    var passwordHash = bcrypt.hashSync(req.body.password, 10);
    db.User.create({
        username: req.body.username,
        password: passwordHash
    }).then(function (submittedUser) {
        res.send(submittedUser);
    });
});
// validate User
router.post("/login", function (req, res) {
    db.User.findAll({
        where: { username: req.body.username }
    }).then(function (user) {
        if (bcrypt.compareSync(req.body.password, user[0].password)) {
            var token = jwt.sign({ user: user }, config.ACCESS_SECRET, { expiresIn: '5m' });
            res.send({ id_token: token });
        }
        else {
            res.send("Failure");
        }
    });
});
module.exports = router;
