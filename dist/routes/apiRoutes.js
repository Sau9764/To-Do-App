"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db = require('../models');
const router = express_1.default.Router();
// get All todo List
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let todos = yield db.Todos.findAll({ where: { userId: req.body.userObj.id } });
        if (todos === null) {
            return res.status(204).send({ msg: 'No Records Found' }); // No content
        }
        res.status(200).send({ data: todos }); // send Data
    }
    catch (err) {
        res.status(503).send({ msg: `Somethong wen't wrong : ${err}` }); // Service Unavaliable
    }
}));
// get By ID
router.get('/find/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let todo = yield db.Todos.findOne({ where: { id: req.params.id, userId: req.body.userObj.id } });
        if (todo === null)
            res.status(204).send({ msg: 'Todo Not Found' }); // No content
        else
            res.status(200).send({ data: todo }); // Sent data
    }
    catch (err) {
        res.status(503).send({ msg: `Somethong wen't wrong : ${err}` }); // Service Unavaliable
    }
}));
// Inserting new Route
router.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let todo = yield db.Todos.create({ text: req.body.text, userId: req.body.userObj.id });
        if (todo !== null)
            res.status(200).send({ msg: "Todo Added Successfully" }); // Data sent
        else
            res.status(400).send({ msg: 'Todo not created.' }); // Bad request
    }
    catch (err) {
        res.status(503).send({ msg: `Somethong wen't wrong : ${err}` }); // Service Unavaliable
    }
}));
// delete todo
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.Todos.destroy({ where: { id: req.params.id, userId: req.body.userObj.id } });
        res.status(200).send({ msg: 'Successfully deleted' });
    }
    catch (err) {
        res.status(503).send({ msg: `Somethong wen't wrong : ${err}` }); // Service Unavaliable
    }
}));
// Update 
router.put('/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.Todos.update({ text: req.body.text }, { where: { id: req.body.id, userId: req.body.userObj.id } });
        res.status(200).send({ msg: 'successfully Edited' });
    }
    catch (err) {
        res.status(503).send({ msg: `Somethong wen't wrong : ${err}` }); // Service Unavaliable
    }
}));
module.exports = router;
