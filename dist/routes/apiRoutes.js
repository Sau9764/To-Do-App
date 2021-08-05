"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db = require("../models");
var router = express_1.default.Router();
// get All todo List
router.get("/all", function (req, res) {
    db.Todo.findAll().then(function (todos) { return res.send(todos); });
});
// get By ID
router.get("/find/:id", function (req, res) {
    db.Todo.findAll({
        where: {
            id: req.params.id
        }
    }).then(function (todo) { return res.send(todo); });
});
// Inserting new Route
router.post("/new", function (req, res) {
    db.Todo.create({
        text: req.body.text
    }).then(function (submittedTodo) { return res.send(submittedTodo); });
});
// delete todo
router.delete('/delete/:id', function (req, res) {
    db.Todo.destroy({
        where: {
            id: req.params.id
        }
    }).then(function () { return res.send("Success"); });
});
// Update 
router.put("/edit", function (req, res) {
    db.Todo.update({
        text: req.body.text
    }, {
        where: { id: req.body.id }
    }).then(function () { return res.send("Success"); });
});
module.exports = router;
